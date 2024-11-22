import { UserEntry } from '../types'

import { userDataAvailable } from '../models/user'

import isValidEmail from './isValidEmail'

const validateSignUp = async (userEntry: UserEntry): Promise<string | null> => {
  if (await userDataAvailable(userEntry.username.toLowerCase(), 'username')) {
    return 'Username not available'
  }
  if (await userDataAvailable(userEntry.email.toLowerCase(), 'email')) {
    return 'Email not available'
  }
  if (!isValidEmail(userEntry.email.toLowerCase())) {
    return 'Email not valid'
  }
  if (userEntry.password.length < 8) {
    return 'Password to short'
  }
  if (userEntry.password.toLowerCase() !== userEntry.rePassword.toLowerCase()) {
    return 'Passwords do not match'
  }
  return null
}
export default validateSignUp
