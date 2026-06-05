"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUserComplaints } from "@/lib/complaints";
import { useRouter } from "next/navigation";
import { User, MessageCircle, Bell } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function TrackingPage() {
  const router = useRouter();
const { user } = useAuth();

const [complaints, setComplaints] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const loadComplaints = async () => {
    if (!user) return;

    try {
      const data = await getUserComplaints(
        user.uid
      );

      setComplaints(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  loadComplaints();
}, [user]);

if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f0e6]">
      Loading...
    </div>
  );
}

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
     {/* CONTENT */}
<div className="p-6 pb-32">

  <h2 className="text-[42px] font-extrabold text-gray-900">
    Your <br />
    <span className="text-orange-600">Complaints</span>
  </h2>

  <p className="text-gray-600 mt-3 mb-8">
    Track every issue you've reported.
  </p>

  {complaints.length === 0 ? (
    <div className="bg-white border border-orange-100 rounded-3xl p-6 shadow-md">
      <p className="text-gray-500">
        No complaints reported yet.
      </p>
    </div>
  ) : (
    complaints.map((complaint) => (
      <div
        key={complaint.id}
        onClick={() =>
          router.push(`/tracking/${complaint.id}`)
        }
        className="bg-white border border-orange-100 rounded-3xl p-5 shadow-md mb-4 cursor-pointer hover:shadow-lg transition"
      >
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg">
            {complaint.title}
          </h3>

          <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs">
            {complaint.status}
          </span>
        </div>

        <p className="text-sm text-gray-500 mt-2">
          {complaint.description}
        </p>

        <p className="text-xs text-gray-400 mt-3">
          Tap to view progress →
        </p>
      </div>
    ))
  )}

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