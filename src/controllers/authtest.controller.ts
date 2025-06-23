import {  AuthService } from '@/services/auth.service'
import { Request, Response,NextFunction } from 'express'


const authService = new AuthService();

export async function register(req:Request, res:Response, next: NextFunction){
  try {
    const {email, password} = req.body
    const user = authService.register(email, password)
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

export async function login(req:Request, res:Response, next: NextFunction){
  try {
    const {email,password} = req.body
    const data = authService.login(email,password)
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}