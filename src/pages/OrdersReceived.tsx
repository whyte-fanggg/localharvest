import { useEffect, useState } from "react"
import { db } from "../lib/firebase"
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore"
import useAuthUser from "../hooks/useAuthUser"
import { Navigate } from "react-router-dom"

type Reservation = {
  id: string
  listingId: string
  buyerId: string
  quantity: number
  reservedAt: string
  isFulfilled?: boolean
  listing: {
    title: string
    price: number
    imageUrl: string
  }
}

export default function OrdersReceived() {
  const { user, isSignedIn, isLoaded } = useAuthUser()
  const [orders, setOrders] = useState<Reservation[]>([])

  useEffect(() => {
    const fetchOrders = async () => {
      const q = query(
        collection(db, "reservations"),
        where("sellerId", "==", user?.id)
      )
      const snapshot = await getDocs(q)
      const results: Reservation[] = []

      for (const docSnap of snapshot.docs) {
        const data = docSnap.data()
        results.push({
          id: docSnap.id,
          listingId: data.listingId,
          buyerId: data.buyerId,
          quantity: data.quantity,
          reservedAt: data.reservedAt?.toDate().toLocaleDateString(),
          isFulfilled: data.isFulfilled || false,
          listing: {
            title: data.listing?.title ?? "Untitled",
            price: data.listing?.price ?? 0,
            imageUrl: data.listing?.imageUrl ?? "",
          },
        })
      }

      setOrders(results)
    }

    if (user?.id) fetchOrders()
  }, [user])

  const handleMarkFulfilled = async (id: string) => {
    if (!confirm("Mark this order as picked up?")) return
    await updateDoc(doc(db, "reservations", id), {
      isFulfilled: true,
    })
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, isFulfilled: true } : o))
    )
  }

  if (!isLoaded) return null
  if (!isSignedIn) return <Navigate to="/sign-in" />

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Orders Received
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-xl bg-white shadow-md overflow-hidden border border-gray-100"
          >
            {order.listing.imageUrl && (
              <img
                src={order.listing.imageUrl}
                alt={order.listing.title}
                className="h-40 w-full object-cover"
              />
            )}
            <div className="p-4 space-y-1">
              <h2 className="text-lg font-semibold">{order.listing.title}</h2>
              <p className="text-sm text-gray-600">Qty: {order.quantity}</p>
              <p className="text-sm text-gray-600">
                Price: ${order.listing.price}
              </p>
              <p className="text-xs text-muted">
                Reserved on {order.reservedAt}
              </p>

              <div className="flex items-center gap-2 mt-3">
                {order.isFulfilled ? (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Picked Up
                  </span>
                ) : (
                  <>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Reserved
                    </span>
                    <button
                      onClick={() => handleMarkFulfilled(order.id)}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-primary)] text-white hover:brightness-105 transition"
                    >
                      Mark as Picked Up
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
