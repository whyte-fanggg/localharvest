import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'

export async function ensureUserInFirestore(user: {
  id: string
  email: string
  fullName: string
}) {
  const userRef = doc(db, 'users', user.id)
  const userSnap = await getDoc(userRef)

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.id,
      email: user.email,
      name: user.fullName,
      role: 'consumer', // default role, can be changed in UI later
      createdAt: serverTimestamp()
    })
  }
}
