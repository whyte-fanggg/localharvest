import { useUser } from '@clerk/clerk-react'

export default function useAuthUser() {
  const { isSignedIn, user, isLoaded } = useUser()
  return { isSignedIn, user, isLoaded }
}
