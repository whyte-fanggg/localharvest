import { db } from './firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

export async function createReservation(listingId: string, consumerId: string) {
  const ref = collection(db, 'reservations')

  await addDoc(ref, {
    listingId,
    consumerId,
    status: 'pending',
    reservedAt: serverTimestamp()
  })
}
