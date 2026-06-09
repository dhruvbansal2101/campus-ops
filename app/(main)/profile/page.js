"use client";

import { useState, useEffect } from "react";
import { getComplaintStats } from "@/lib/complaints";
import { User, Settings, LogOut, Bell, Shield} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth";
import ProtectedRoute from "@/components/ProtectedRoute";
import { getUserDocument } from "@/lib/users";

export default function ProfilePage() {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [active, setActive] = useState(null);
  const router = useRouter();
  const [stats, setStats] = useState({
  total: 0,
  resolved: 0,
  pending: 0,
});

  const handleLogout = async () => {
  try {
    await logout();
    router.push("/");
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  const loadStats = async () => {
    if (!user) return;

    try {
      const data = await getComplaintStats(user.uid);
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  loadStats();
}, [user]);

useEffect(() => {
  const loadUser = async () => {
    if (!user) return;

    const data = await getUserDocument(user.uid);
    setUserData(data);
  };

  loadUser();
}, [user]);

  const handleClick = (name) => {
    setActive(name);
    setTimeout(() => setActive(null), 200); // quick feedback reset
  };

  const itemStyle = (name) =>
    `group bg-white border border-orange-100 rounded-2xl p-4 flex items-center justify-between cursor-pointer
    transition-all duration-200
    ${
      active === name
        ? "bg-orange-100 scale-[0.98]"
        : "hover:bg-orange-50 hover:shadow-md hover:-translate-y-1"
    }`;

  return (
    <ProtectedRoute>
    <div className="bg-[#f5f0e6] min-h-screen flex flex-col">

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
      <div className="p-6 pb-28 space-y-6">

        {/* PROFILE CARD */}
        <div className="bg-white border border-orange-100 rounded-3xl p-6 shadow-md flex items-center gap-5 hover:shadow-xl transition">
          <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-xl font-bold">
  {user?.displayName?.charAt(0) || "U"}
</div>

          <div>
  <h2 className="text-xl font-bold text-gray-900">
    {user?.displayName || "Guest User"}
  </h2>

  <p className="text-sm text-gray-500">
    {user?.email || "No email available"}
  </p>

  <span className="inline-block mt-2 text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full font-medium">
  {userData?.role
    ? userData.role.charAt(0).toUpperCase() +
      userData.role.slice(1)
    : "Student"}
</span>
</div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white border border-orange-100 rounded-2xl p-4 text-center shadow-sm hover:shadow-lg transition">
            <p className="text-xl font-bold">
  {stats.total}
</p>
            <p className="text-xs text-gray-500">Reports</p>
          </div>

          <div className="bg-white border border-orange-100 rounded-2xl p-4 text-center shadow-sm hover:shadow-lg transition">
            <p className="text-xl font-bold text-green-600">
  {stats.resolved}
</p>
            <p className="text-xs text-gray-500">Resolved</p>
          </div>

          <div className="bg-white border border-orange-100 rounded-2xl p-4 text-center shadow-sm hover:shadow-lg transition">
            <p className="text-xl font-bold text-orange-500">
  {stats.pending}
</p>
            <p className="text-xs text-gray-500">Pending</p>
          </div>
        </div>

        {/* SETTINGS */}
        <div className="space-y-4">

          {/* ACCOUNT */}
          <div
            onClick={() => handleClick("settings")}
            className={itemStyle("settings")}
          >
            <div className="flex items-center gap-3">
              <Settings size={18} className="transition group-hover:text-orange-600 group-hover:scale-110" />
              <span className="text-sm font-medium">Account Settings</span>
            </div>
            <span className="text-gray-400">{">"}</span>
          </div>

          {/* NOTIFICATIONS */}
          <div
            onClick={() => handleClick("notifications")}
            className={itemStyle("notifications")}
          >
            <div className="flex items-center gap-3">
              <Bell size={18} className="transition group-hover:text-orange-600 group-hover:scale-110" />
              <span className="text-sm font-medium">Notifications</span>
            </div>
            <span className="text-gray-400">{">"}</span>
          </div>

          {/* PRIVACY */}
          <div
            onClick={() => handleClick("privacy")}
            className={itemStyle("privacy")}
          >
            <div className="flex items-center gap-3">
              <Shield size={18} className="transition group-hover:text-orange-600 group-hover:scale-110" />
              <span className="text-sm font-medium">Privacy & Security</span>
            </div>
            <span className="text-gray-400">{">"}</span>
          </div>

        </div>

        {userData?.role === "admin" && (
  <div
    onClick={() => router.push("/admin")}
    className={itemStyle("admin")}
  >
    <div className="flex items-center gap-3">
      <Shield
        size={18}
        className="transition group-hover:text-orange-600 group-hover:scale-110"
      />

      <span className="text-sm font-medium">
        Admin Panel
      </span>
    </div>

    <span className="text-gray-400">{">"}</span>
  </div>
)}

        {/* LOGOUT */}
       <div>
  <button
    onClick={async () => {
      handleClick("logout");

      setTimeout(async () => {
        await handleLogout();
      }, 200);
    }}
    className={`w-full bg-orange-500 text-white py-3 rounded-full font-semibold shadow-md
    transition duration-200
    ${
      active === "logout"
        ? "scale-95 bg-orange-600"
        : "hover:bg-orange-600 hover:scale-[1.02]"
    } flex items-center justify-center gap-2`}
  >
    <LogOut size={16} />
    Log out
  </button>
</div>

      </div>
    </div>
    </ProtectedRoute>
  );
}