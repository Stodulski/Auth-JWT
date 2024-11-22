import { User, UserMongoDB } from '../types'
import { comparePassword } from './bcrypt'
import { findUserByUsername } from '../models/user'

const validateSignIn = async (
  userEntry: User
): Promise<string | UserMongoDB> => {
  const user = await findUserByUsername(userEntry.username.toLowerCase())
  if (user === null) return 'Username not exist'
  const passwordsMatch = await comparePassword(
    userEntry.password.toLowerCase(),
    user.password
  )
  if (!passwordsMatch) return 'Passwords dont match'
  return user
}
export default validateSignIn
