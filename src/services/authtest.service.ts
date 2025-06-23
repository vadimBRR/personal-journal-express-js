import { prisma } from '@/db/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || "supersecret"
export class AuthTestService {
	// register
	// hash password  & bcrypt.hash
	// create user & prisma.user.create
	async register(email: string, password: string) {
		const hashed = await bcrypt.hash(password, 10)
		return await prisma.user.create({ data: { email, password: hashed } })
	}

	// login
	// get user         & prisma.user.findUnique
	// check password   & bcrypt.compare
	// generating token & jwt.sign({user}, jwt_secret, {options})
  async login(email:string, password:string){
    const user = await prisma.user.findUnique({where: {email}})
    if(!user) throw new Error("User not found!")

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) throw new Error("Invalid Password!");

    const token = jwt.sign({user:user.id}, JWT_SECRET, {expiresIn: '1h'})
    return {token, user: {id: user.id, email: user.email}}
  }

	// verifyToken
	// verifying token &jwt.verify
  verifyToken(token:string){
    jwt.verify(token, JWT_SECRET)
  }
}
