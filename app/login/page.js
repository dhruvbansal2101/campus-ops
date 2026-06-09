"use client";

import {
  loginWithGoogle,
  loginWithEmail,
  signupWithEmail,
  resetPassword,
} from "@/lib/auth";
import {
  createUserDocument,
  getUserDocument,
} from "@/lib/users";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [isSignup, setIsSignup] = useState(false);

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

  const handleGoogleLogin = async () => {
  try {
    const user = await loginWithGoogle();

await createUserDocument(user);
    const userDoc = await getUserDocument(
  user.uid
);

if (userDoc?.role === "admin") {
  router.push("/admin");
} else {
  router.push("/dashboard");
}
  } catch (error) {
    console.error(error);
  }
};

const handleEmailAuth = async () => {
  try {
    let user;

    if (isSignup) {
      user = await signupWithEmail(
        name,
        email,
        password
      );

      await createUserDocument(user);
    } else {
      user = await loginWithEmail(
        email,
        password
      );
    }

    const userDoc = await getUserDocument(
      user.uid
    );

    if (userDoc?.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
  } catch (error) {
    alert(error.message);
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

  {isSignup && (
    <>
      <label className="text-xs text-gray-600 font-medium">
        Full Name
      </label>

      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        className="mb-4 mt-1 bg-white rounded-full"
      />
    </>
  )}

  <label className="text-xs text-gray-600 font-medium">
    Campus Email
  </label>

  <Input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="you@university.edu"
    className="mb-4 mt-1 bg-white rounded-full"
  />

            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Password</span>
              <span
  className="text-orange-600 cursor-pointer"
  onClick={async () => {
    if (!email) {
      alert("Enter your email first");
      return;
    }

    await resetPassword(email);
    alert("Password reset email sent");
  }}
>
  Forgot?
</span>
            </div>

            <Input
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="••••••••"
  className="mb-5 bg-white rounded-full"
/>

            <Button
  className="rounded-full py-3 font-semibold"
  onClick={handleEmailAuth}
>
  {isSignup ? "Create Account" : "Log In"}
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

<Button
  className="rounded-full py-3 font-semibold"
  onClick={() => setIsSignup(!isSignup)}
>
  {isSignup
    ? "Already have an account?"
    : "Sign Up"}
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