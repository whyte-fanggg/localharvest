import { useState } from "react"
import { db, storage } from "../lib/firebase"
import { collection, addDoc, Timestamp } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { Navigate, useNavigate } from "react-router-dom"
import useAuthUser from "../hooks/useAuthUser"
import { v4 as uuid } from "uuid"

export default function AddListing() {
  const { isSignedIn, user, isLoaded } = useAuthUser()
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState("")
  const [unit, setUnit] = useState("")
  const [price, setPrice] = useState("")
  const [pickupLocation, setPickupLocation] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setImageFile(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user?.id) return

    try {
      let imageUrl = ""
      if (imageFile) {
        const imageRef = ref(storage, `listings/${user.id}/${uuid()}`)
        await uploadBytes(imageRef, imageFile)
        imageUrl = await getDownloadURL(imageRef)
      }

      await addDoc(collection(db, "listings"), {
        ownerId: user.id,
        title,
        description,
        quantity: Number(quantity),
        unit,
        price: Number(price),
        imageUrl,
        createdAt: Timestamp.now(),
        isAvailable: true,
      })

      navigate("/my-listings")
    } catch (err) {
      console.error("Error creating listing:", err)
    }
  }

  if (!isLoaded) return null
  if (!isSignedIn) return <Navigate to="/sign-in" />

  return (
    <div className="max-w-xl mx-auto px-6 py-10 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Add New Listing
      </h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Fresh Basil Leaves"
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none transition"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description of your item..."
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none transition"
            rows={3}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Available quantity"
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Unit
            </label>
            <input
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="e.g., bunches, kg, packs"
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none transition"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price ($)
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price per unit"
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none transition"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pickup Location
          </label>
          <input
            type="text"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            placeholder="e.g., 123 Garden Ln, Windsor"
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none transition"
            required
          />
        </div>

        <label className="block mb-4">
          <span className="block text-sm font-medium text-gray-700 mb-1">
            Upload Image
          </span>
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            onChange={handleChange}
            className="mt-1 block w-full text-sm 
              file:mr-4 file:py-2 file:px-4 
              file:rounded-full file:border-0 
              file:text-sm file:font-semibold 
              file:bg-[var(--color-primary)] file:text-white 
              hover:file:bg-green-700 
              file:cursor-pointer 
              transition-all duration-200"
          />
        </label>
        <button
          type="submit"
          className="mt-6 w-full rounded-full bg-[var(--color-secondary)] px-6 py-3 text-sm font-bold text-white shadow hover:brightness-105 hover:scale-105 transition-all duration-200"
        >
          🍅 Save Listing
        </button>
      </form>
    </div>
  )
}
