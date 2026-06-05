"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { getComplaintById } from "@/lib/complaints";
import { User, Bell, MessageCircle } from "lucide-react";

export default function ComplaintDetailsPage() {
      const params = useParams();

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadComplaint = async () => {
      try {
        const data = await getComplaintById(params.id);
        setComplaint(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadComplaint();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const status = complaint?.status || "reported";

  const isAssigned =
  status === "assigned" ||
  status === "in_progress" ||
  status === "sorted";

const isInProgress =
  status === "in_progress" ||
  status === "sorted";

const isSorted =
  status === "sorted";

  return (
    <ProtectedRoute>
      <div className="bg-[#f5f0e6] min-h-screen flex flex-col">

        {/* HEADER */}
        <div className="bg-[#ece5da] px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <div className="bg-white rounded-full p-2 shadow-sm">
              <User size={16} />
            </div>

            <span className="text-orange-600 font-bold text-lg">
              CampusOps
            </span>
          </div>

          <div className="bg-white rounded-full p-2 shadow-sm">
            <Bell size={16} className="text-orange-500" />
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6 pb-32">

          <h2 className="text-[42px] font-extrabold text-gray-900">
  {complaint?.title}
</h2>

          <p className="text-gray-600 mt-3 mb-8">
  {complaint?.description}
</p>

          {/* TIMELINE CARD */}
          <div className="bg-white border border-orange-100 rounded-3xl p-6 shadow-md">

            <div className="flex justify-between text-xs text-gray-500 mb-6">
              <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full font-medium">
                {
  status
    .replace("_", " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
}
              </span>

              <span>Live Status</span>
            </div>

            <div className="space-y-6">

              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white">
    ✓
  </div>
                <div>
                  <p className="font-semibold">
                    Complaint Submitted
                  </p>

                  <p className="text-xs text-gray-500">
                    Your complaint has been recorded.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div
  className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${
    isAssigned
      ? "bg-orange-500"
      : "bg-gray-300"
  }`}
>
  {isAssigned ? "✓" : ""}
</div>

                <div>
                  <p
  className={`font-semibold ${
    isAssigned
      ? "text-orange-600"
      : "text-gray-400"
  }`}
>
  Assigned
</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div
  className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${
    isInProgress
      ? "bg-orange-500"
      : "bg-gray-300"
  }`}
>
  {isInProgress ? "✓" : ""}
</div>

                <div>
                  <p
  className={`font-semibold ${
    isInProgress
      ? "text-orange-600"
      : "text-gray-400"
  }`}
>
  In Progress
</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div
  className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${
    isSorted
      ? "bg-green-500"
      : "bg-gray-300"
  }`}
>
  {isSorted ? "✓" : ""}
</div>

                <div>
                  <p
  className={`font-semibold ${
    isSorted
      ? "text-green-600"
      : "text-gray-400"
  }`}
>
  Sorted
</p>
                </div>
              </div>

            </div>
          </div>

          {/* ASSIGNED CARD */}
          <div className="mt-8 bg-white border border-orange-100 rounded-3xl p-5 shadow-md flex items-center justify-between">

            <div className="flex items-center gap-4">
              <div className="bg-orange-50 rounded-full p-3">
                <User size={18} />
              </div>

              <div>
                <p className="font-semibold">
                  Campus Team
                </p>

                <p className="text-xs text-gray-600">
                  Complaint Support
                </p>
              </div>
            </div>

            <button className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full">
              <MessageCircle size={16} />
              Chat
            </button>

          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
}