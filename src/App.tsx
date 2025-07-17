import { useEffect } from "react"
import AppLayout from "./layouts/AppLayout"
import AppRoutes from "./routes"
import useAuthUser from "./hooks/useAuthUser"
import { ensureUserInFirestore } from "./lib/firestore"

export default function App() {
  const { isSignedIn, user } = useAuthUser()

  useEffect(() => {
    if (isSignedIn && user) {
      ensureUserInFirestore({
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress || "",
        fullName:
          user.firstName || user.lastName
            ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
            : user.primaryEmailAddress?.emailAddress ?? "Unnamed User",
      })
    }
  }, [isSignedIn, user])

  return (
    <AppLayout>
      <AppRoutes />
    </AppLayout>
  )
}
