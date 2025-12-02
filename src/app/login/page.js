"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // 🔹 تسجيل الدخول بالـ credentials
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("All fields required");

    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      alert("Invalid credentials");
      setLoading(false);
      return;
    }

    await redirectByRole(router);
    setLoading(false);
  };

  // 🔹 تسجيل الدخول بالـ OAuth (Google/GitHub)
  const handleOAuthLogin = async (provider) => {
    const result = await signIn(provider, { redirect: false });
    if (result?.error) {
      alert("OAuth login failed");
      return;
    }
    await redirectByRole(router);
  };

  // 🔹 دالة مشتركة للـ redirect حسب الـ role
  const redirectByRole = async (router) => {
    const sessionRes = await fetch("/api/auth/session");
    const session = await sessionRes.json();

    if (session?.user?.role === "admin") {
      router.push("/admin");
    } else if (session?.user?.role === "user") {
      router.push("/profile");
    } else {
      // 🔹 fallback → الصفحة الرئيسية
      router.push("/");
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="center-area d-flex justify-content-center align-items-center">
        <form
          className="p-4 shadow-sm rounded form-light"
          style={{ width: "400px" }}
          onSubmit={handleLogin}
        >
          <h3 className="text-center mb-4">Login</h3>

          {/* Credentials login */}
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

          <button className="btn btn-primary w-100 mb-3" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>

          {/* Divider */}
          <div className="text-center my-3">
            <span className="text-muted">Or sign in with</span>
          </div>

          {/* OAuth buttons */}
          <div className="d-flex justify-content-center gap-3">
            <button
              type="button"
              className="btn btn-light rounded-circle shadow-sm"
              onClick={() => handleOAuthLogin("google")}
              title="Sign in with Google"
            >
              <FaGoogle size={22} color="#DB4437" />
            </button>
            <button
              type="button"
              className="btn btn-light rounded-circle shadow-sm"
              onClick={() => handleOAuthLogin("github")}
              title="Sign in with GitHub"
            >
              <FaGithub size={22} />
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
