import { Timestamp } from 'firebase/firestore'

export type Listing = {
  id: string
  title: string
  description: string
  category: string
  price: number
  quantity: number
  unit: string
  pickupLocation: string
  availableFrom: string | Date
  imageUrl: string
  ownerId: string
  isAvailable: boolean
  createdAt?: Timestamp
}
