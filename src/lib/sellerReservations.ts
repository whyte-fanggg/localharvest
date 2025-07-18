import { db } from './firebase'
import {
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { Reservation } from '../types/Reservation'
import { Listing } from '../types/Listing'

export type SellerReservation = Reservation & {
  listing: Listing
}

export async function getReservationsForSeller(sellerId: string): Promise<SellerReservation[]> {
  const listingsSnap = await getDocs(query(collection(db, 'listings'), where('ownerId', '==', sellerId)))
  const listingIds = listingsSnap.docs.map(doc => doc.id)

  const allReservations: SellerReservation[] = []

  for (const listingId of listingIds) {
    const resSnap = await getDocs(query(collection(db, 'reservations'), where('listingId', '==', listingId)))

    for (const docSnap of resSnap.docs) {
      const reservation = docSnap.data() as Reservation
      const listingData = listingsSnap.docs.find(l => l.id === reservation.listingId)

      if (listingData) {
        allReservations.push({
          ...reservation,
          id: docSnap.id,
          listing: {
            id: listingData.id,
            ...(listingData.data() as Omit<Listing, 'id'>)
          }
        })
      }
    }
  }

  return allReservations
}
