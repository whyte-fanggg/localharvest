import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from "./firebase"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

export async function ensureUserInFirestore(user: {
  id: string
  email: string
  fullName: string
}) {
  const userRef = doc(db, "users", user.id)
  const userSnap = await getDoc(userRef)

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.id,
      email: user.email,
      name: user.fullName,
      role: "consumer", // default role, can be changed in UI later
      createdAt: serverTimestamp(),
    })
  }
}

export async function uploadImage(file: File, path: string): Promise<string> {
  const storage = getStorage()
  const fileRef = ref(storage, path)

  await uploadBytes(fileRef, file)
  const downloadURL = await getDownloadURL(fileRef)

  return downloadURL
}
