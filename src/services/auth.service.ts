import { prisma } from '@/db/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret'

export class AuthService {
	async register(email: string, password: string) {
		const hashed = await bcrypt.hash(password, 10)
		return await prisma.user.create({
			data: {
				email,
				password: hashed,
			},
		})
	}

  async login(email:string, password:string){
    const user = await prisma.user.findUnique({where: {email}})
    if(!user) throw new Error("User not found")

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw new Error("Invalid password")

    const token = jwt.sign({user:user.id}, JWT_SECRET, {expiresIn: '1h'})

    return {token, user: {id:user.id, email:user.email}}

  }

  verifyToken(token:string){
    return jwt.verify(token, JWT_SECRET)
  }


}
