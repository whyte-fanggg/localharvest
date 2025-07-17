export type UserRole = "farmer" | "gardener" | "consumer"

export interface User {
  uid: string
  name: string
  email: string
  role: UserRole
}

export interface Listing {
  id?: string
  ownerId: string
  title: string
  description: string
  category: string
  price: number
  quantity: number
  unit: string
  imageURL: string
  availableFrom: string
  pickupLocation: string
  isAvailable: boolean
}

export interface Reservation {
  id?: string
  listingId: string
  consumerId: string
  reservedAt: string
  status: "pending" | "confirmed" | "cancelled" | "fulfilled"
}
