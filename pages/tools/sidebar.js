import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Budgy</h2>
      <nav>
        <Link href="/input">Home</Link>
        <Link href="/map">Map</Link>
        <Link href="/advisor">Advisor</Link>
        <a href="/tracker">Tracker</a> {/* anchor tag to refresh tracker page */}
      </nav>
    </div>
  );
}
