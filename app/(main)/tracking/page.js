"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getLatestComplaint } from "@/lib/complaints";
import { User, MessageCircle, Bell } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function TrackingPage() {
  const { user } = useAuth();

const [complaint, setComplaint] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const loadComplaint = async () => {
    if (!user) return;

    try {
      const data = await getLatestComplaint(user.uid);
      setComplaint(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  loadComplaint();
}, [user]);

if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f0e6]">
      Loading...
    </div>
  );
}

const status = complaint?.status || "reported";

const isReported = true;

const isHandling =
  status === "in_progress" ||
  status === "sorted";

const isSorted =
  status === "sorted";

  return (
    <ProtectedRoute>
    <div className="bg-[#f5f0e6] min-h-screen flex flex-col">

      {/* HEADER */}
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

      {/* CONTENT */}
      <div className="p-6 pb-32">

        <h2 className="text-[42px] font-extrabold text-gray-900">
          Get your life <br />
          <span className="text-orange-600">together.</span>
        </h2>

        <p className="text-gray-600 mt-3 mb-8 max-w-md">
          Your request for{" "}
<span className="font-semibold">
  {complaint?.title || "Complaint"}
</span>{" "}
is moving through the system.
</p>

        {/* TIMELINE CARD */}
        <div className="bg-white border border-orange-100 rounded-3xl p-6 shadow-md">

          {/* TOP */}
          <div className="flex justify-between text-xs text-gray-500 mb-6">
  <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full font-medium">
    Case #{complaint?.id?.slice(0, 6)}
  </span>

  <span>
    Status: {status}
  </span>
</div>

          {/* TIMELINE */}
          <div className="relative">

            {/* 🔥 ANIMATED LINE */}
            <div className="absolute left-[12px] top-0 w-[2px] bg-orange-200 h-full overflow-hidden">
              <div className="w-full bg-orange-500 animate-lineGrow"></div>
            </div>

            {/* STEP 1 */}
            <div className="flex gap-4 mb-7 relative animate-fadeUp delay-100">
            <div
  className={`w-6 h-6 rounded-full flex items-center justify-center text-white z-10 ${
    isReported ? "bg-orange-500" : "bg-gray-300"
  }`}
>
  ✓
</div>
              <div>
                <p className="font-semibold text-sm">Sent</p>
                <p className="text-xs text-gray-500">
                  We caught your message at 09:14 AM.
                </p>
              </div>
            </div>

            {/* STEP 2 */}
            <div className="flex gap-4 mb-7 relative animate-fadeUp delay-200">
              <div
  className={`w-6 h-6 rounded-full flex items-center justify-center text-white z-10 ${
    isHandling ? "bg-orange-500" : "bg-gray-300"
  }`}
>
  ✓
</div>
              <div>
                <p className="font-semibold text-sm">Being handled</p>
                <p className="text-xs text-gray-500">
                  Janitorial team is prepping the gear.
                </p>
              </div>
            </div>

            {/* STEP 3 (ACTIVE) */}
            <div className="flex gap-4 mb-7 relative animate-fadeUp delay-300">
              <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white z-10 animate-pulse">
                ●
              </div>
              <div>
                <p className="font-bold text-orange-600 text-lg">
                  Almost there
                </p>
                <p className="text-xs text-gray-500">
                  Technician is currently in building A.
                </p>

                <div className="mt-2 bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full inline-block">
                  ⚡ ETA: 15 mins
                </div>
              </div>
            </div>

            {/* STEP 4 */}
            <div
  className={`flex gap-4 relative animate-fadeUp delay-500 ${
    isSorted ? "" : "opacity-60"
  }`}
>
  <div
  className={`w-6 h-6 rounded-full z-10 ${
    isSorted ? "bg-green-500" : "bg-gray-300"
  }`}
></div>
              <div>
                <p className="font-semibold text-gray-400 text-sm">Sorted</p>
                <p className="text-xs text-gray-400">
                  Case closed and verified.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* ASSIGNED */}
        <div className="mt-8 bg-white border border-orange-100 rounded-3xl p-5 shadow-md flex items-center justify-between animate-fadeUp delay-700">

          <div className="flex items-center gap-4">
            <div className="bg-orange-50 rounded-full p-3">
              <User size={18} />
            </div>

            <div>
              <p className="font-semibold">Marcus V.</p>
              <p className="text-xs text-gray-600">
                Campus Maintenance Lead
              </p>
            </div>
          </div>

          <button className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition active:scale-95">
            <MessageCircle size={16} />
            Chat
          </button>

        </div>

      </div>

      {/* 🔥 CUSTOM ANIMATIONS */}
      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeUp {
          animation: fadeUp 0.5s ease forwards;
          opacity: 0;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-700 { animation-delay: 0.7s; }

        @keyframes lineGrow {
          from { height: 0%; }
          to { height: 100%; }
        }

        .animate-lineGrow {
          animation: lineGrow 1s ease forwards;
        }
      `}</style>

    </div>
    </ProtectedRoute>
  );
}