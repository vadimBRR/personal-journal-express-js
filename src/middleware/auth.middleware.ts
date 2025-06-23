
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET || "supersecret"

export function authenticate(req:Request, res:Response, next: NextFunction){
  const authHeader = req.headers.authorization
  if(!authHeader || !authHeader.startsWith('Bearer ')){
    res.status(401).json({message: 'No token provided'})
  }else{
      console.log(`Auth Header: `);
      console.log(authHeader);
      const token = authHeader.split(' ')[1]
    
      try {
        const payload = jwt.verify(token, JWT_SECRET)
        // @ts-ignore
        req.user = payload
        next()
      } catch (error) {
        res.status(401).json({message: "Invalid token"})
      }
  }


}