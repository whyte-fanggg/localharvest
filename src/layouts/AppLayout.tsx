import Logo from '../components/Logo'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white">
        <Logo />
        <nav className="text-sm font-medium space-x-4">
          <a href="#">Listings</a>
          <a href="#">Login</a>
        </nav>
      </header>
      <main className="flex-1 px-6 py-10">{children}</main>
      <footer className="text-center text-xs text-gray-500 py-4">
        © stegadgets.com
      </footer>
    </div>
  )
}
