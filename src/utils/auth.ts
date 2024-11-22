import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '@/firebase'

interface RegisterUserResponse {
  token: string
  uid: string
}

export const registerUserThroughFirebase = async (
  email: string,
  password: string,
  displayName: string,
): Promise<RegisterUserResponse> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(userCredential.user, { displayName })
    const token = await userCredential.user.getIdToken(true)
    return { token, uid: userCredential.user.uid }
  } catch (error) {
    console.error('Error registering user:', error)
    throw error
  }
}

interface LoginUserResponse {
  token: string
  uid: string
}

export const signInThroughFirebase = async (
  email: string,
  password: string,
): Promise<LoginUserResponse> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  const token = await userCredential.user.getIdToken()
  return { token, uid: userCredential.user.uid }
}
