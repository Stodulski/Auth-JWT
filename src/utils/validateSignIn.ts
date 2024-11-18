import { User, UserMongoDB } from '../types'
import { comparePassword } from './cryptPasswords'
import { findUser } from '../models/user'

const validateSignIn = async (
  userEntry: User
): Promise<string | UserMongoDB> => {
  const user = await findUser(userEntry.username)
  if (user === null) return 'Username not exist'
  const passwordsMatch = await comparePassword(
    userEntry.password,
    user.password
  )
  if (!passwordsMatch) return 'Passwords dont match'
  return user
}
export default validateSignIn
