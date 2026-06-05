"use client";
import { useAuth } from "@/context/AuthContext";
import { createComplaint } from "@/lib/complaints";
import { useRouter } from "next/navigation";
import { UploadCloud, Wifi, Utensils, Droplet, Building2, User, Bell } from "lucide-react";
import Button from "@/components/ui/Button";
import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function ReportPage() {
const [selected, setSelected] = useState(null);
const [description, setDescription] = useState("");
const [loading, setLoading] = useState(false);

const { user } = useAuth();
const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");

    if (category) setSelected(category);
  }, []);

  const categories = [
    { id: "infra", name: "Infrastructure", desc: "Leaking roofs, broken tiles, the usual.", icon: Building2 },
    { id: "cafeteria", name: "Cafeteria", desc: "Mystery meat or cold coffee. Again.", icon: Utensils },
    { id: "wifi", name: "Wi-Fi & Tech", desc: "Lagging in the library is a crime.", icon: Wifi },
    { id: "hygiene", name: "Hygiene", desc: "Restrooms that require hazard suits.", icon: Droplet },
  ];

  const handleSubmit = async () => {
  if (!selected) {
    alert("Please select a category");
    return;
  }

  if (!description.trim()) {
    alert("Please describe the issue");
    return;
  }

  try {
    setLoading(true);

    await createComplaint({
      title:
        categories.find((c) => c.id === selected)?.name ||
        "Complaint",
      category: selected,
      description,
      userId: user.uid,
      userName: user.displayName,
    });

    alert("Complaint submitted successfully!");

    router.push("/tracking");
  } catch (error) {
    console.error(error);
    alert("Failed to submit complaint");
  } finally {
    setLoading(false);
  }
};

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
      <div className="p-6 pb-28">

        <h2 className="text-3xl font-extrabold mb-2">
          Something’s broken, obviously.
        </h2>

        <p className="text-gray-600 mb-6">
          Pick your poison from the list below.
        </p>

        {/* CATEGORY GRID */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {categories.map((item, i) => {
            const Icon = item.icon;
            const active = selected === item.id;

            return (
              <div
                key={i}
                onClick={() => setSelected(item.id)}
                className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 border
                ${
                  active
                    ? "bg-orange-500 text-white scale-[1.03] shadow-xl ring-2 ring-orange-200"
                    : "bg-white border-orange-100 hover:-translate-y-1 hover:shadow-lg hover:border-orange-200"
                }`}
              >
                <Icon size={20} className="transition group-hover:scale-110" />
                <h3 className="text-sm font-semibold mt-2">{item.name}</h3>
                <p className="text-xs opacity-80">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* TEXT AREA */}
        <h2 className="text-xl font-bold mb-2">What’s the tea?</h2>

        <div className="bg-white border border-orange-100 p-5 rounded-2xl mb-6 shadow-sm focus-within:ring-2 focus-within:ring-orange-200 transition">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell us everything. Don’t hold back, we’re judgement-free (mostly)."
            className="w-full bg-transparent outline-none text-sm h-24"
          />
        </div>

        {/* RECEIPTS */}
        <h2 className="text-xl font-bold mb-3">Got Proof?(Upload it here)</h2>

        <div className="flex gap-4 mb-6">

          {/* 🔥 UPLOAD (ENHANCED) */}
          <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300
            hover:border-orange-400 hover:bg-orange-50 hover:scale-105 hover:shadow-md group">
            <UploadCloud className="transition group-hover:scale-110 group-hover:text-orange-500" />
          </div>

          {/* IMAGES */}
          <img
            src="/img1.jpg"
            className="w-24 h-24 rounded-full object-cover transition hover:scale-105 hover:shadow-md"
          />
          <img
            src="/img2.jpg"
            className="w-24 h-24 rounded-full object-cover transition hover:scale-105 hover:shadow-md"
          />

        </div>

        {/* BUTTON */}
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="rounded-full py-3 transition hover:scale-[1.02] active:scale-95">
          {loading ? "Submitting..." : "Send it 🚀"}
        </Button>

      </div>
    </div>
    </ProtectedRoute>
  );
}