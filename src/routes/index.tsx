import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Auth from "../pages/Auth"
import MyListings from "../pages/MyListings"
import AddListing from "../pages/AddListing"
import Listings from "../pages/Listings"
import MyReservations from "../pages/MyReservations"
import OrdersReceived from "../pages/OrdersReceived"
import EditListing from "../pages/EditListing"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<Auth />} />
      <Route path="/my-listings" element={<MyListings />} />
      <Route path="/add-listing" element={<AddListing />} />
      <Route path="/listings" element={<Listings />} />
      <Route path="/my-reservations" element={<MyReservations />} />
      <Route path="/orders-received" element={<OrdersReceived />} />
      <Route path="/edit-listing/:id" element={<EditListing />} />
    </Routes>
  )
}
