import { db } from './firebase'
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc
} from 'firebase/firestore'
import { Reservation } from '../types/Reservation'
import { Listing } from '../types/Listing'

export type ReservationWithListing = Reservation & {
  listing: Listing
}

export async function getReservationsByUser(consumerId: string): Promise<ReservationWithListing[]> {
  const q = query(collection(db, 'reservations'), where('consumerId', '==', consumerId))
  const snapshot = await getDocs(q)

  const data: ReservationWithListing[] = []

  for (const docSnap of snapshot.docs) {
    const reservation = docSnap.data() as Reservation
    const listingRef = doc(db, 'listings', reservation.listingId)
    const listingSnap = await getDoc(listingRef)

    if (listingSnap.exists()) {
      data.push({
        ...reservation,
        id: docSnap.id,
        listing: {
          id: listingSnap.id,
          ...(listingSnap.data() as Omit<Listing, 'id'>)
        }
      })
    }
  }

  return data
}
