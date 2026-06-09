"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUserDocument } from "@/lib/users";
import { useRouter } from "next/navigation";

export default function AdminRoute({
  children,
}) {
  const { user } = useAuth();
  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) {
        router.push("/login");
        return;
      }

      const userDoc =
        await getUserDocument(
          user.uid
        );

      if (
        userDoc?.role !== "admin"
      ) {
        router.push("/dashboard");
        return;
      }

      setLoading(false);
    };

    checkAdmin();
  }, [user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Checking permissions...
      </div>
    );
  }

  return children;
}