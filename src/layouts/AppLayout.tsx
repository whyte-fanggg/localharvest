import Logo from "../components/Logo"
import AuthMenu from "../components/AuthMenu"
import { useUser } from "@clerk/clerk-react"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useUser()

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white">
        <Logo />
        <div className="flex items-center gap-4 text-sm font-medium">
          <a href="/my-listings" className="hover:underline">
            My Listings
          </a>
          <a href="/add-listing" className="hover:underline">Add Listing</a>
          {!isSignedIn && (
            <a href="/sign-in" className="hover:underline">
              Login
            </a>
          )}
          <AuthMenu />
        </div>
      </header>
      <main className="flex-1 px-6 py-10">{children}</main>
      <footer className="text-center text-xs text-gray-500 py-4">
        © stegadgets.com
      </footer>
    </div>
  )
}
