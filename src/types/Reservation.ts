import { Timestamp } from 'firebase/firestore'

export type Reservation = {
  id?: string
  listingId: string
  consumerId: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'fulfilled'
  reservedAt: Timestamp
}
