import { storage } from './firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export async function uploadListingImage(file: File, userId: string) {
  const id = crypto.randomUUID()
  const path = `listings/${userId}/${id}-${file.name}`
  const storageRef = ref(storage, path)

  await uploadBytes(storageRef, file)
  const url = await getDownloadURL(storageRef)

  return url
}
