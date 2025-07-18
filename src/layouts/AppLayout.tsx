import Logo from "../components/Logo"
import AuthMenu from "../components/AuthMenu"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-md px-6 py-2 flex items-center justify-between">
        <Logo className="h-12 w-30" />

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--color-text)]">
            <a
              href="/listings"
              className="relative after:block after:h-[2px] after:bg-[var(--color-primary)] after:scale-x-0 after:transition-transform after:origin-left hover:after:scale-x-100 text-[var(--color-text)] hover:text-[var(--color-primary)] font-medium tracking-wide transition"
            >
              Browse
            </a>
            <a
              href="/my-listings"
              className="relative after:block after:h-[2px] after:bg-[var(--color-primary)] after:scale-x-0 after:transition-transform after:origin-left hover:after:scale-x-100 text-[var(--color-text)] hover:text-[var(--color-primary)] font-medium tracking-wide transition"
            >
              My Listings
            </a>
            <a
              href="/my-reservations"
              className="relative after:block after:h-[2px] after:bg-[var(--color-primary)] after:scale-x-0 after:transition-transform after:origin-left hover:after:scale-x-100 text-[var(--color-text)] hover:text-[var(--color-primary)] font-medium tracking-wide transition"
            >
              Reservations
            </a>
            <a
              href="/orders-received"
              className="relative after:block after:h-[2px] after:bg-[var(--color-primary)] after:scale-x-0 after:transition-transform after:origin-left hover:after:scale-x-100 text-[var(--color-text)] hover:text-[var(--color-primary)] font-medium tracking-wide transition"
            >
              Orders
            </a>
          </nav>

          <a
            href="/add-listing"
            className="px-5 py-2 rounded-full bg-[var(--color-secondary)] text-white font-semibold text-sm shadow-sm hover:brightness-105 hover:scale-105 transition"
          >
            + Add
          </a>

          <AuthMenu />
        </div>
      </header>

      <main className="flex-1 px-6 py-10">{children}</main>
      <footer className="text-center text-xs text-[var(--color-muted)] py-6 border-t bg-[var(--color-bg)]">
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between max-w-6xl mx-auto px-4">
          <p>
            © {new Date().getFullYear()}{" "}
            <a
              href="https://www.stegadgets.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline hover:text-[var(--color-primary)] transition"
            >
              stegadgets.com
            </a>{" "}
            — LocalHarvest
          </p>
          <div className="flex gap-4 text-sm">
            <a
              href="#"
              className="hover:text-[var(--color-primary)] hover:underline transition"
            >
              Privacy
            </a>
            <a
              href="#"
              className="hover:text-[var(--color-primary)] hover:underline transition"
            >
              Terms
            </a>
            <a
              href="mailto:hello@stegadgets.com"
              className="hover:text-[var(--color-primary)] hover:underline transition"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
