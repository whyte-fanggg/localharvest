import { useState } from "react"
import { Navigate } from "react-router-dom"
import useAuthUser from "../hooks/useAuthUser"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
//import { uploadListingImage } from "../lib/upload"
import { db } from "../lib/firebase"

export default function AddListing() {
  const { isSignedIn, user, isLoaded } = useAuthUser()
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "vegetables",
    price: "",
    quantity: "",
    unit: "kg",
    pickupLocation: "",
    availableFrom: "",
    imageFile: null as File | null,
  })
  if (!isLoaded) return null
  if (!isSignedIn) return <Navigate to="/sign-in" />

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target

    if (name === "imageFile") {
      const fileInput = e.target as HTMLInputElement
      const file = fileInput.files?.[0] || null
      setForm((f) => ({ ...f, imageFile: file }))
    } else {
      setForm((f) => ({ ...f, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      const imageUrl =
        "https://via.placeholder.com/400x300.png?text=Produce+Image"

      await addDoc(collection(db, "listings"), {
        title: form.title,
        description: form.description,
        category: form.category,
        price: parseFloat(form.price),
        quantity: parseFloat(form.quantity),
        unit: form.unit,
        pickupLocation: form.pickupLocation,
        availableFrom: new Date(form.availableFrom),
        imageUrl,
        ownerId: user.id,
        isAvailable: true,
        createdAt: serverTimestamp(),
      })

      alert("Listing saved!")
      window.location.href = "/my-listings"
    } catch (err) {
      console.error("Failed to save listing:", err)
      alert("Something went wrong. Try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-display">Add New Listing</h1>

      <input
        name="title"
        placeholder="Title"
        className="w-full p-2 border rounded"
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        className="w-full p-2 border rounded"
        onChange={handleChange}
        required
      />

      <div className="flex gap-4">
        <select
          name="category"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          value={form.category}
        >
          <option value="vegetables">Vegetables</option>
          <option value="fruits">Fruits</option>
          <option value="grains">Grains</option>
          <option value="herbs">Herbs</option>
        </select>

        <select
          name="unit"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          value={form.unit}
        >
          <option value="kg">kg</option>
          <option value="lb">lb</option>
          <option value="bunch">bunch</option>
        </select>
      </div>

      <div className="flex gap-4">
        <input
          name="price"
          type="number"
          placeholder="Price"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
      </div>

      <input
        name="pickupLocation"
        placeholder="Pickup Location"
        className="w-full p-2 border rounded"
        onChange={handleChange}
        required
      />
      <input
        name="availableFrom"
        type="date"
        className="w-full p-2 border rounded"
        onChange={handleChange}
        required
      />

      {/* <input
        name="imageFile"
        type="file"
        accept="image/*"
        className="w-full p-2"
        onChange={handleChange}
        required
      /> */}

      <button
        type="submit"
        className="bg-[var(--color-primary)] text-white px-4 py-2 rounded"
      >
        Save Listing
      </button>
    </form>
  )
}
