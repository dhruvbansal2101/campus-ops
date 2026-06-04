"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import { loginWithGoogle } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const handleGoogleLogin = async () => {
  try {
    await loginWithGoogle();
    router.push("/dashboard");
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-[#9ec5d3] via-[#b7d7e2] to-[#dbeff5] px-4">

      {/* CENTER CONTENT */}
      <div className="flex items-center justify-center flex-1">
        <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">

          {/* LEFT SIDE */}
          <div className="flex flex-col justify-center">
            
            <h1 className="text-orange-600 font-extrabold text-3xl tracking-tight">
              CampusOps
            </h1>

            <h2 className="text-[72px] md:text-[90px] font-extrabold text-gray-900 leading-[0.95] mt-6">
              Get in <br /> here.
            </h2>

            <p className="text-lg text-gray-600 mt-5 max-w-md">
              Welcome back, we missed the energy.
            </p>

          </div>

          {/* RIGHT SIDE */}
          <div className="bg-[#efe7db] rounded-3xl p-8 shadow-xl max-w-md w-full ml-auto">
            
            <label className="text-xs text-gray-600 font-medium">
              Campus Email
            </label>
            <Input
              type="email"
              placeholder="you@university.edu"
              className="mb-4 mt-1 bg-white rounded-full"
            />

            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Password</span>
              <span className="text-orange-600 cursor-pointer">Forgot?</span>
            </div>

            <Input
              type="password"
              placeholder="••••••••"
              className="mb-5 bg-white rounded-full"
            />

            <Button
              className="rounded-full py-3 font-semibold"
              onClick={() => router.push("/dashboard")}
            >
              Log in
            </Button>

            <div className="text-center text-xs text-gray-500 mt-4 mb-2">
              OR MAYBE
            </div>

            <Button className="rounded-full py-3 font-semibold"
            onClick={handleGoogleLogin}>
              Continue with Google
              </Button>

<div className="text-center text-xs text-gray-500 mt-4 mb-2">
  OR MAYBE
</div>

<Button className="rounded-full py-3 font-semibold">
  Sign up
</Button>

          </div>

        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center text-xs text-gray-600 mb-4">
        By getting in here, you’re agreeing to our{" "}
        
        <span className="font-semibold text-sm underline cursor-pointer text-gray-800">
          House Rules
        </span>{" "}
        
        and{" "}
        
        <span className="font-semibold text-sm underline cursor-pointer text-gray-800">
          Privacy Logic
        </span>.
      </div>

    </div>
  );
}