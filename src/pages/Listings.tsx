import { useEffect, useState } from "react"
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore"
import { db } from "../lib/firebase"
import { Timestamp } from "firebase/firestore"
import { Listing } from "../types/Listing"
import useAuthUser from "../hooks/useAuthUser"
import { motion } from "framer-motion"

export default function Listings() {
  const { user, isSignedIn } = useAuthUser()
  const [listings, setListings] = useState<Listing[]>([])

  useEffect(() => {
    const fetchListings = async () => {
      const q = query(
        collection(db, "listings"),
        where("isAvailable", "==", true)
      )
      const snapshot = await getDocs(q)
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Listing[]
      setListings(data)
    }
    fetchListings()
  }, [])

  const handleReserve = async (listingId: string) => {
    if (!user) return

    const listing = listings.find((l) => l.id === listingId)
    if (!listing) return alert("Listing not found.")

    if (listing.quantity <= 0) {
      alert("This item is no longer available.")
      return
    }

    try {
      // Check if user already has a reservation for this listing
      const q = query(
        collection(db, "reservations"),
        where("buyerId", "==", user.id),
        where("listingId", "==", listing.id)
      )
      const snapshot = await getDocs(q)

      if (!snapshot.empty) {
        const existing = snapshot.docs[0]
        const existingData = existing.data()
        const currentQty = existingData.quantity || 1

        if (currentQty >= listing.quantity) {
          alert("You’ve reserved the max available for this item.")
          return
        }

        await updateDoc(doc(db, "reservations", existing.id), {
          quantity: currentQty + 1,
        })
      } else {
        await addDoc(collection(db, "reservations"), {
          buyerId: user.id,
          sellerId: listing.ownerId,
          listingId: listing.id,
          quantity: 1,
          reservedAt: Timestamp.now(),
          listing: {
            title: listing.title,
            price: listing.price,
            imageUrl: listing.imageUrl || "",
          },
        })
      }

      await updateDoc(doc(db, "listings", listing.id), {
        quantity: listing.quantity - 1,
      })

      alert("Reservation successful!")
    } catch (err) {
      console.error("Reserve error:", err)
      alert("Something went wrong.")
    }
  }
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Available Produce
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <motion.div
            key={listing.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
          >
            <img
              src={listing.imageUrl}
              alt={listing.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                {listing.title}
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                {listing.description}
              </p>
              <div className="text-sm text-gray-700">
                <p>
                  <span className="font-medium">Qty:</span> {listing.quantity}{" "}
                  {listing.unit}
                </p>
                <p>
                  <span className="font-medium">Price:</span> ${listing.price}
                </p>
                <p>
                  <span className="font-medium">Pickup:</span>{" "}
                  {listing.pickupLocation}
                </p>
              </div>
              <div className="mt-auto pt-4 flex justify-between items-center">
                <p className="text-xs text-gray-400">
                  From: {new Date(listing.availableFrom).toLocaleDateString()}
                </p>
                {isSignedIn && user?.id !== listing.ownerId && (
                  <button
                    onClick={() => handleReserve(listing.id)}
                    className="mt-4 self-end px-4 py-1.5 text-sm font-medium text-white bg-[var(--color-primary)] rounded-full hover:brightness-110 transition"
                  >
                    Reserve
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
