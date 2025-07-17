import { UserButton, useUser } from '@clerk/clerk-react'

export default function AuthMenu() {
  const { isSignedIn } = useUser()

  if (!isSignedIn) return null

  return (
    <div className="flex items-center gap-2">
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}
