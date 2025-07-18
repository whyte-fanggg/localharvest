import { useEffect, useState } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import {
  doc,
  getDoc,
  updateDoc,
  Timestamp
} from 'firebase/firestore'
import {
  ref,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage'
import { db, storage } from '../lib/firebase'
import useAuthUser from '../hooks/useAuthUser'
import { v4 as uuid } from 'uuid'

export default function EditListing() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isSignedIn, user, isLoaded } = useAuthUser()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState('')
  const [unit, setUnit] = useState('')
  const [price, setPrice] = useState('')
  const [existingImage, setExistingImage] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)

  useEffect(() => {
    const fetchListing = async () => {
      if (!id) return
      const docRef = doc(db, 'listings', id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const data = docSnap.data()
        if (data.ownerId !== user?.id) return navigate('/my-listings')

        setTitle(data.title)
        setDescription(data.description)
        setQuantity(data.quantity)
        setUnit(data.unit)
        setPrice(data.price)
        setExistingImage(data.imageUrl)
      }
    }

    if (user?.id && id) fetchListing()
  }, [id, user, navigate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setImageFile(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user?.id || !id) return

    let imageUrl = existingImage

    if (imageFile) {
      const imageRef = ref(storage, `listings/${user.id}/${uuid()}`)
      await uploadBytes(imageRef, imageFile)
      imageUrl = await getDownloadURL(imageRef)
    }

    await updateDoc(doc(db, 'listings', id), {
      title,
      description,
      quantity: Number(quantity),
      unit,
      price: Number(price),
      imageUrl,
      updatedAt: Timestamp.now()
    })

    navigate('/my-listings')
  }

  if (!isLoaded) return null
  if (!isSignedIn) return <Navigate to="/sign-in" />

  return (
    <div className="max-w-xl mx-auto px-6 py-10 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Edit Listing</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none transition"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none transition"
            rows={3}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
            <input
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none transition"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none transition"
            required
          />
        </div>

        {existingImage && (
          <div className="mb-3">
            <img
              src={existingImage}
              alt="Current listing"
              className="rounded-md max-h-48 object-cover"
            />
          </div>
        )}

        <label className="block mb-4">
          <span className="block text-sm font-medium text-gray-700 mb-1">Replace Image</span>
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
          ✅ Update Listing
        </button>
      </form>
    </div>
  )
}
