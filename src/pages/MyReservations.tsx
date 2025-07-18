import { useEffect, useState } from "react"
import { db } from "../lib/firebase"
import { collection, query, where, getDocs } from "firebase/firestore"
import useAuthUser from "../hooks/useAuthUser"
import { Navigate } from "react-router-dom"
import { deleteDoc, doc } from "firebase/firestore"

type Reservation = {
  id: string
  listingId: string
  sellerId: string
  quantity: number
  reservedAt: string
  listing: {
    title: string
    price: number
    imageUrl: string
  }
}

export default function MyReservations() {
  const { user, isSignedIn, isLoaded } = useAuthUser()
  const [reservations, setReservations] = useState<Reservation[]>([])

  const handleCancel = async (id: string) => {
    if (!confirm("Cancel this reservation?")) return
    await deleteDoc(doc(db, "reservations", id))
    setReservations((prev) => prev.filter((r) => r.id !== id))
  }

  useEffect(() => {
    const fetchReservations = async () => {
      const q = query(
        collection(db, "reservations"),
        where("buyerId", "==", user?.id)
      )
      const snapshot = await getDocs(q)
      const results: Reservation[] = []

      for (const docSnap of snapshot.docs) {
        const data = docSnap.data()
        results.push({
          id: docSnap.id,
          listingId: data.listingId,
          sellerId: data.sellerId,
          quantity: data.quantity,
          reservedAt: data.reservedAt?.toDate().toLocaleDateString(),
          listing: {
            title: data.listing?.title ?? "Untitled",
            price: data.listing?.price ?? 0,
            imageUrl: data.listing?.imageUrl ?? "",
          },
        })
      }

      setReservations(results)
    }

    if (user?.id) fetchReservations()
  }, [user])

  if (!isLoaded) return null
  if (!isSignedIn) return <Navigate to="/sign-in" />

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        My Reservations
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reservations.map((r) => (
          <div
            key={r.id}
            className="rounded-xl bg-white shadow-md overflow-hidden border border-gray-100"
          >
            {r.listing.imageUrl && (
              <img
                src={r.listing.imageUrl}
                alt={r.listing.title}
                className="h-40 w-full object-cover"
              />
            )}
            <div className="p-4 space-y-1">
              <h2 className="text-lg font-semibold">{r.listing.title}</h2>
              <p className="text-sm text-gray-600">Qty: {r.quantity}</p>
              <p className="text-sm text-gray-600">Price: ${r.listing.price}</p>
              <p className="text-xs text-muted">Reserved on {r.reservedAt}</p>
              <div className="flex items-center gap-2 mt-3">
                <span className="inline-block rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-medium text-white">
                  Reserved
                </span>
                <button
                  onClick={() => handleCancel(r.id)}
                  className="rounded-full px-3 py-1 text-xs font-medium text-red-700 bg-red-100 hover:bg-red-200 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
