"use client";

import { Wifi, Droplet, Utensils, User, Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <ProtectedRoute>
    <div className="flex flex-col min-h-screen bg-[#f5f0e6]">

{/* HEADER */}
<div className="bg-[#ece5da] px-6 py-4 flex items-center justify-between shadow-sm">

  {/* LEFT */}
  <div className="flex items-center gap-2">
    <div className="bg-white rounded-full p-2 shadow-sm">
      <User size={16} />
    </div>

    <span className="text-orange-600 font-bold text-lg">
      CampusOps
    </span>
  </div>

  {/* RIGHT */}
  <div className="bg-white rounded-full p-2 shadow-sm cursor-pointer transition-all duration-300 hover:bg-orange-50 hover:scale-105">
    <Bell
      size={16}
      className="text-orange-500"
    />
  </div>

</div>

      {/* 🔹 MAIN CONTENT */}
      <div className="p-6 flex-1">

        {/* GREETING */}
        <h1 className="text-[32px] md:text-[40px] font-extrabold text-gray-900">
  Hey, {user?.displayName?.split(" ")[0] || "Student"}!
</h1>

        <p className="text-sm text-gray-500 mb-6">
          Something bugging you on campus?
        </p>

        {/* BIG CARD */}
        <div
          onClick={() => router.push("/report?category=cafeteria")}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-3xl p-6 mb-5 flex flex-col items-center gap-2 cursor-pointer 
          transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95"
        >
          <Utensils size={24} />
          <h2 className="text-lg font-semibold">
            Mess Food Sucks
          </h2>
        </div>

        {/* SMALL CARDS */}
        <div className="grid grid-cols-2 gap-4 mb-6">

          <div
            onClick={() => router.push("/report?category=wifi")}
            className="bg-white border border-orange-100 p-5 rounded-2xl flex flex-col items-center gap-2 cursor-pointer 
            transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95"
          >
            <Wifi size={20} />
            No WiFi
          </div>

          <div
            onClick={() => router.push("/report?category=infra")}
            className="bg-white border border-orange-100 p-5 rounded-2xl flex flex-col items-center gap-2 cursor-pointer 
            transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95"
          >
            <Droplet size={20} />
            Leaky Tap
          </div>

        </div>

        {/* IN PROGRESS */}
        <h2 className="text-lg font-semibold mb-3">In Progress</h2>

        {/* CARD 1 */}
        <div className="bg-white border border-orange-100 p-4 rounded-2xl mb-4 relative flex gap-3 cursor-pointer
        transition-all duration-300 hover:-translate-y-1 hover:shadow-md">

          <Wifi size={16} />

          <div className="flex-1">
            <p className="font-semibold">Hostel B Wifi Deadzone</p>
            <p className="text-xs text-gray-500">
              Reported in Common Room.
            </p>
          </div>

          <span className="absolute top-3 right-3 text-[10px] bg-orange-200 text-orange-600 px-2 py-1 rounded-full font-semibold">
            WE'RE LOOKING INTO IT
          </span>

        </div>

        {/* CARD 2 */}
        <div className="bg-white border border-orange-100 p-4 rounded-2xl relative flex gap-3 cursor-pointer
        transition-all duration-300 hover:-translate-y-1 hover:shadow-md">

          <Droplet size={16} />

          <div className="flex-1">
            <p className="font-semibold">Library Lights</p>
            <p className="text-xs text-gray-500">
              Fixed by maintenance.
            </p>
          </div>

          <span className="absolute top-3 right-3 text-[10px] bg-green-200 text-green-700 px-2 py-1 rounded-full font-bold">
            SORTED
          </span>

        </div>

      </div> {/* ✅ MAIN CONTENT CLOSED */}

      {/* 🔥 BOTTOM BANNER */}
      <div className="px-6 pb-6">
        <div className="relative h-44 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">

          <img
            src="/banner.jpg"
            className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
          />

          <div className="absolute inset-0 bg-black/40" />

          <div className="relative z-10 h-full flex flex-col justify-center px-6 text-white">
            <h3 className="text-2xl font-extrabold">
              The campus belongs to you.
            </h3>
            <p className="text-sm mt-2">
              Let’s keep it running smooth.
            </p>
          </div>

        </div>
      </div>

    </div>
    </ProtectedRoute>
  );
}