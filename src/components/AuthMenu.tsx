import { UserButton, SignInButton, useUser } from "@clerk/clerk-react"

export default function AuthMenu() {
  const { user, isLoaded } = useUser()

  if (!isLoaded) return null

  return user ? (
    <UserButton
      afterSignOutUrl="/"
      appearance={{
        elements: {
          avatarBox:
            "w-8 h-8 ring-1 ring-[var(--color-bg)] rounded-full transition",
        },
      }}
    />
  ) : (
    <SignInButton mode="modal">
      <button className="text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] hover:underline underline-offset-4 transition">
        Sign In
      </button>
    </SignInButton>
  )
}
