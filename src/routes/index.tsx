import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Auth from "../pages/Auth"
import MyListings from "../pages/MyListings"
import AddListing from '../pages/AddListing'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<Auth />} />
      <Route path="/my-listings" element={<MyListings />} />
      <Route path="/add-listing" element={<AddListing />} />
    </Routes>
  )
}
