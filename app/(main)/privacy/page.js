"use client";
import { useState } from "react";
import {
  createPasswordForGoogleUser,
  changePassword,
} from "@/lib/auth";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { Shield } from "lucide-react";

export default function PrivacyPage() {
const [activeButton, setActiveButton] =
  useState(null);
    const [password, setPassword] =
  useState("");

const [confirmPassword, setConfirmPassword] =
  useState("");
  const { user } = useAuth();

  const hasPassword =
    user?.providerData?.some(
      (provider) =>
        provider.providerId === "password"
    );
    
     const handlePasswordAction =
  async () => {
    setActiveButton("password");

    try {
      if (
        password !== confirmPassword
      ) {
        alert("Passwords do not match");
        return;
      }

      if (password.length < 6) {
        alert(
          "Password must be at least 6 characters"
        );
        return;
      }

      if (hasPassword) {
        await changePassword(password);

        alert(
          "Password updated successfully"
        );
      } else {
        await createPasswordForGoogleUser(
          user.email,
          password
        );

        alert(
          "Password created successfully"
        );

        window.location.reload();
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setTimeout(
        () => setActiveButton(null),
        200
      );
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#f5f0e6] p-6">

        <div className="flex items-center gap-3 mb-6">
          <Shield size={24} />
          <h1 className="text-3xl font-bold">
            Privacy & Security
          </h1>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow">

          <h2 className="font-bold text-lg mb-2">
            Password Settings
          </h2>

          <div className="space-y-4">

  <input
    type="password"
    placeholder={
      hasPassword
        ? "New Password"
        : "Create Password"
    }
    value={password}
    onChange={(e) =>
      setPassword(
        e.target.value
      )
    }
    className="w-full border rounded-xl p-3"
  />

  <input
    type="password"
    placeholder="Confirm Password"
    value={confirmPassword}
    onChange={(e) =>
      setConfirmPassword(
        e.target.value
      )
    }
    className="w-full border rounded-xl p-3"
  />

<button
  onClick={handlePasswordAction}
  className={`bg-orange-500 text-white px-5 py-3 rounded-xl font-semibold transition duration-200
  ${
    activeButton === "password"
      ? "scale-95 bg-orange-600"
      : "hover:bg-orange-600 hover:scale-[1.02]"
  }`}
>
    {hasPassword
      ? "Change Password"
      : "Create Password"}
  </button>

</div>

        </div>

      </div>
    </ProtectedRoute>
  );
}