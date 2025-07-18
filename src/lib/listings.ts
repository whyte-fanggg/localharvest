import { db } from './firebase'
import {
  collection,
  getDocs,
  query,
  where
} from 'firebase/firestore'
import { Listing } from '../types/Listing'

export async function getListingsByUser(userId: string): Promise<Listing[]> {
  const q = query(collection(db, 'listings'), where('ownerId', '==', userId))
  const snapshot = await getDocs(q)

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Listing, 'id'>)
  }))
}
