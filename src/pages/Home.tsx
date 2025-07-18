import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="bg-[var(--color-bg)] min-h-screen pt-4 pb-24">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-4xl font-display font-semibold text-[var(--color-primary)] mb-4">
          LocalHarvest
        </h1>
        <p className="text-lg text-[var(--color-text)] max-w-xl mx-auto mb-8">
          A fresh way to discover, reserve, and pick up locally-grown produce
          right in your community.
        </p>
      </div>

      <div className="mt-12 max-w-4xl mx-auto text-center">
        <h2 className="text-xl font-semibold mb-4 text-[var(--color-primary)]">
          How It Works
        </h2>
        <div className="grid sm:grid-cols-3 gap-6 text-sm text-[var(--color-muted)]">
          <div className="p-4 bg-white rounded shadow-sm">
            🛒 <strong>Browse Listings</strong>
            <br /> See what’s freshly available nearby.
          </div>
          <div className="p-4 bg-white rounded shadow-sm">
            📦 <strong>Reserve Produce</strong>
            <br /> Secure your items before pickup.
          </div>
          <div className="p-4 bg-white rounded shadow-sm">
            🌻 <strong>Pickup Locally</strong>
            <br /> Support neighbors. Eat fresh.
          </div>
        </div>
      </div>

      <div className="mt-12 max-w-5xl mx-auto text-center">
        <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-2">
          Trusted by your neighbors
        </h2>
        <p className="text-sm text-[var(--color-muted)] mb-6">
          LocalHarvest is already helping farmers and families trade fresh
          produce in your community.
        </p>
        <div className="flex justify-center gap-6 flex-wrap text-sm text-[var(--color-text)]">
          <span className="bg-[var(--color-accent)] text-white px-4 py-1 rounded-full">
            50+ Listings Weekly
          </span>
          <span className="bg-[var(--color-accent)] text-white px-4 py-1 rounded-full">
            200+ Local Members
          </span>
          <span className="bg-[var(--color-accent)] text-white px-4 py-1 rounded-full">
            100% Organic Friendly
          </span>
        </div>
      </div>

      <div className="mt-12 max-w-4xl mx-auto px-4">
        <h2 className="text-xl font-semibold text-[var(--color-primary)] text-center mb-6">
          What People Are Saying
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="bg-white rounded-lg p-4 shadow">
            <p className="text-sm text-[var(--color-text)] mb-2">
              “I traded a basket of cucumbers for apples — smooth, simple,
              local. Love it.”
            </p>
            <p className="text-xs text-[var(--color-muted)]">
              — Priya, Gardener
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <p className="text-sm text-[var(--color-text)] mb-2">
              “No more food waste. Now I just post what’s ripe and people
              reserve it.”
            </p>
            <p className="text-xs text-[var(--color-muted)]">
              — Marco, Backyard Farmer
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-3">
          Ready to share or shop fresh?
        </h3>
        <Link
          to="/listings"
          className="inline-block rounded-full bg-[var(--color-secondary)] px-6 py-3 text-white text-sm font-bold shadow hover:brightness-105 hover:scale-105 transition-all"
        >
          🌽 Browse Listings
        </Link>
      </div>
    </div>
  )
}
