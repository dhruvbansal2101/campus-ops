"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlusSquare, Activity, User } from "lucide-react";

export default function MainLayout({ children }) {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Home" },
    { href: "/report", icon: PlusSquare, label: "Report" },
    { href: "/tracking", icon: Activity, label: "Tracking" },
    { href: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="min-h-screen relative bg-[#f5f0e6]">

      {/* PAGE CONTENT */}
      <main className="pb-28">{children}</main>

      {/* 🔥 FLOATING NAV */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">

        <div className="flex items-center gap-8 px-6 py-3 rounded-full 
          bg-white/70 backdrop-blur-md shadow-lg border border-white/40">

          {navItems.map((item, index) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={index}
                href={item.href}
                className="flex flex-col items-center text-xs"
              >
                <Icon
                  size={22}
                  className={`transition ${
                    active
                      ? "text-orange-500 scale-110"
                      : "text-gray-500"
                  }`}
                />
                <span
                  className={`mt-1 ${
                    active
                      ? "text-orange-500 font-medium"
                      : "text-gray-500"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

      </div>

    </div>
  );
}