"use client";
import AdminRoute from "@/components/AdminRoute";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import {
  getAllComplaints,
  updateComplaintStatus,
} from "@/lib/complaints";

export default function AdminPage() {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadComplaints = async () => {
  try {
    const data = await getAllComplaints()
    setComplaints(data);
  } catch (error) {
    console.error("ADMIN ERROR:", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
  if (user) {
    loadComplaints();
  }
}, [user]);

  const handleStatusChange = async (
    complaintId,
    newStatus
  ) => {
    try {
      await updateComplaintStatus(
        complaintId,
        newStatus
      );

      loadComplaints();
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      Checking authentication...
    </div>
  );
}

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <AdminRoute>
    <div className="min-h-screen bg-[#f5f0e6] p-6">

      <h1 className="text-4xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <div className="space-y-4">

        {complaints.map((complaint) => (
          <div
            key={complaint.id}
            className="bg-white rounded-2xl p-5 shadow"
          >
            <div className="flex justify-between items-start">

              <div>
                <h2 className="font-bold text-lg">
                  {complaint.title}
                </h2>

                <p className="text-gray-500 text-sm">
                  {complaint.description}
                </p>

                <p className="text-sm mt-2">
                  Student: {complaint.userName}
                </p>

                <p className="text-sm">
                  Category: {complaint.category}
                </p>
              </div>

              <select
                value={complaint.status}
                onChange={(e) =>
                  handleStatusChange(
                    complaint.id,
                    e.target.value
                  )
                }
                className="border rounded-lg p-2"
              >
                <option value="reported">
                  Reported
                </option>

                <option value="assigned">
                  Assigned
                </option>

                <option value="in_progress">
                  In Progress
                </option>

                <option value="sorted">
                  Sorted
                </option>
              </select>

            </div>
          </div>
        ))}

      </div>
    </div>
    </AdminRoute>
  );
}