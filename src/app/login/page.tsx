"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  // ولیدیشن ساده توی فرانت
  const validateForm = () => {
    if (!fullName || fullName.length < 2) {
      setError("Full name must be at least 2 characters.");
      return false;
    }
    if (!username || username.length < 3) {
      setError("Username must be at least 3 characters.");
      return false;
    }
    if (!emailOrPhone || (!emailOrPhone.includes("@") && !/^\d{10,}$/.test(emailOrPhone))) {
      setError("Enter a valid email or phone number (min 10 digits).");
      return false;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    try {
      const res = await fetch("http://localhost:8000/api/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name: fullName, username, email_or_phone: emailOrPhone, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Signup failed");
      router.push("/login");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg flex flex-col items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Create an Account</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="w-full">
          <label className="text-sm font-semibold text-gray-600">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="w-full">
          <label className="text-sm font-semibold text-gray-600">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="johndoe"
            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="w-full">
          <label className="text-sm font-semibold text-gray-600">Email or Phone</label>
          <input
            type="text"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            placeholder="email@example.com or 1234567890"
            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="w-full">
          <label className="text-sm font-semibold text-gray-600">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Sign Up
        </button>

        <p className="text-sm text-gray-600">
          Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
}