"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Email and password required");

    setLoading(true);
    try {
      // 1️⃣ Create user via API
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!data.ok) {
        alert(data.error || "Failed to signup");
        setLoading(false);
        return;
      }

      // 2️⃣ Sign in automatically
      const signInResult = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (signInResult?.error) {
        alert(signInResult.error);
      } else {
        // Redirect to profile
        router.push("/profile");
      }
    } catch (err) {
      console.error(err);
      alert("Error signing up");
    }
    setLoading(false);
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="center-area">
        <form
          className="p-4 shadow-sm rounded form-light"
          style={{ width: "400px" }}
          onSubmit={handleSignup}
        >
          <h3 className="text-center mb-4">Create Account</h3>

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btn-success w-100" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}
