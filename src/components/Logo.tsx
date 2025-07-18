import { Link } from "react-router-dom"

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className="block">
      <img
        src="/logo.png" // replace with your actual logo
        alt="LocalHarvest"
        className={className}
      />
    </Link>
  )
}
