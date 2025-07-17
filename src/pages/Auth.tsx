import { SignIn } from '@clerk/clerk-react'

export default function Auth() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignIn path="/sign-in" routing="path" redirectUrl="/my-listings" />
    </div>
  )
}
