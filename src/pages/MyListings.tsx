import { Navigate } from 'react-router-dom'
import useAuthUser from '../hooks/useAuthUser'

export default function MyListings() {
  const { isSignedIn, user, isLoaded } = useAuthUser()

  if (!isLoaded) return null // wait until Clerk finishes loading

  if (!isSignedIn) return <Navigate to="/sign-in" />

  return (
    <div>
      <h1 className="text-3xl font-display text-[var(--color-primary)]">
        Hello {user?.firstName}, here are your listings.
      </h1>
    </div>
  )
}
