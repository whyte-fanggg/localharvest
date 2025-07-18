import { useEffect, useState } from "react"
import { db } from "../lib/firebase"
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore"
import useAuthUser from "../hooks/useAuthUser"
import { Navigate, Link } from "react-router-dom"
import { Listing } from "../types/Listing"
import { motion } from "framer-motion"

export default function MyListings() {
  const { isSignedIn, user, isLoaded } = useAuthUser()
  const [listings, setListings] = useState<Listing[]>([])

  useEffect(() => {
    if (!user?.id) return
    const load = async () => {
      const q = query(
        collection(db, "listings"),
        where("ownerId", "==", user.id)
      )
      const snapshot = await getDocs(q)
      const result: Listing[] = snapshot.docs.map((doc) => ({
        ...(doc.data() as Listing),
        id: doc.id,
      }))
      setListings(result)
    }
    load()
  }, [user?.id])

  const handleDelete = async (id: string) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this listing?"
    )
    if (!confirm) return
    await deleteDoc(doc(db, "listings", id))
    setListings((prev) => prev.filter((l) => l.id !== id))
  }

  if (!isLoaded) return null
  if (!isSignedIn) return <Navigate to="/sign-in" />

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Your Produce Listings
      </h1>

      {listings.length === 0 ? (
        <p className="text-gray-600">You haven’t added any listings yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-lg bg-white shadow-md p-4 flex flex-col"
            >
              <img
                src={listing.imageUrl}
                alt={listing.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="text-lg font-semibold text-gray-800">
                {listing.title}
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                {listing.description}
              </p>
              <p className="text-sm">
                <span className="font-medium">Qty:</span> {listing.quantity}{" "}
                {listing.unit}
              </p>
              <p className="text-sm mb-4">
                <span className="font-medium">Price:</span> ${listing.price}
              </p>
              <div className="flex justify-end gap-3 mt-auto">
                <Link
                  to={`/edit-listing/${listing.id}`}
                  className="rounded-full bg-[var(--color-secondary)] px-5 py-2 text-sm font-semibold text-white shadow hover:brightness-105 hover:scale-105 transition-all duration-200"
                >
                  ✏️ Edit
                </Link>
                <button
                  onClick={() => handleDelete(listing.id)}
                  className="rounded-full bg-[var(--color-danger)] px-5 py-2 text-sm font-semibold text-white shadow hover:brightness-105 hover:scale-105 transition-all duration-200 cursor-pointer"
                >
                  🗑 Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
