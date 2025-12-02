"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const resetHandler = (e) => {
    e.preventDefault();
    alert("Password reset link will be sent to your email.");
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="center-area">
        <form
          className="p-4 shadow-sm rounded form-light"
          style={{ width: "400px" }}
          onSubmit={resetHandler}
        >
          <h3 className="text-center mb-3">Forgot Password</h3>

          <p className="text-muted text-center mb-4" style={{ fontSize: "14px" }}>
            Enter your email address and we'll send you a link to reset your password.
          </p>

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="btn btn-primary w-100">Send Reset Link</button>

          <div className="text-center mt-3">
            <a href="/login" className="text-decoration-none">
              Back to Login
            </a>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
