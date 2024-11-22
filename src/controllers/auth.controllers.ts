import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { TokenPayload } from '../types'
import { findUserById } from '../models/user'

export const signToken = async (
  username: string,
  id: string
): Promise<string | null> => {
  try {
    const secret = process.env.SECRET
    if (secret === undefined) {
      throw new Error()
    }
    const token = jwt.sign({ username, id }, secret, {
      expiresIn: '72h'
    })
    return token
  } catch (error) {
    return null
  }
}
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const headerAuth: string | undefined = req.headers.authorization
  if (headerAuth === undefined) {
    res.status(401).json({ status: 'Error', message: 'No token provided' })
    return
  }
  const token = headerAuth.split(' ')[1]
  if (token === undefined) {
    res.status(401).json({ status: 'Error', message: 'Malformed token' })
    return
  }
  const secret = process.env.SECRET
  if (secret === undefined) {
    res.status(500).json({ status: 'Error', message: 'An error has ocurred' })
    return
  }
  try {
    const decoded = jwt.verify(token, secret) as TokenPayload
    if ((await findUserById(decoded.id)) === null) {
      res.status(500).json({ status: 'Error', message: 'An error has ocurred' })
      return
    }
    req.user = decoded
    next()
  } catch (error) {
    res.status(500).json({ message: 'An error has ocurred' })
  }
}
