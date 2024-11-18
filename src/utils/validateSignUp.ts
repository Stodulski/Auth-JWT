import { UserEntry } from '../types'

import { userDataAvailable } from '../models/user'

import isValidEmail from './isValidEmail'

const validateSignUp = async (userEntry: UserEntry): Promise<string | null> => {
  if (await userDataAvailable(userEntry.username.toLowerCase(), 'username')) {
    return 'Username not available'
  }
  if (
    (await userDataAvailable(userEntry.email.toLowerCase(), 'email')) &&
    !isValidEmail(userEntry.email.toLowerCase())
  ) {
    return 'Email not available or incorrect'
  }
  if (userEntry.password !== userEntry.rePassword) {
    return 'Passwords do not match'
  }
  return null
}
export default validateSignUp
