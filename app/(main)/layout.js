import Link from "next/link";

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#fdf6f0]">
      
      {/* Page Content */}
      <main className="flex-1 pb-20">{children}</main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-md flex justify-around py-3 rounded-t-2xl">
        <Link href="/dashboard">🏠</Link>
        <Link href="/report">📝</Link>
        <Link href="/tracking">📍</Link>
        <Link href="/profile">👤</Link>
      </nav>

    </div>
  );
}