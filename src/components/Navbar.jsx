"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [theme, setTheme] = useState("light");
  const { data: session, status } = useSession();

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.documentElement.setAttribute("data-bs-theme", saved);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-bs-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
      <div className="container">
        <Link className="navbar-brand" href="/">Imagination</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link href="/about" className="nav-link">About</Link>
            </li>
            <li className="nav-item">
              <Link href="/services" className="nav-link">Services</Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className="nav-link">Contact</Link>
            </li>

            <li className="nav-item">
              <Link href="/image-generator" className="nav-link">Image Generator</Link>
            </li>

            <li className="nav-item">
              <Link href="/video-generator" className="nav-link">Video Generator</Link>
            </li>
          </ul>

          {/* Right-side: Theme + Auth buttons */}
          <div className="d-flex align-items-center gap-2">
            <button className="btn btn-outline-primary" onClick={toggleTheme}>
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>

            {/* IF LOGGED OUT → show Login + Signup */}
            {status !== "authenticated" && (
              <>
                <Link href="/login" className="btn btn-outline-success">Login</Link>
                <Link href="/signup" className="btn btn-primary">Signup</Link>
              </>
            )}

            {/* IF LOGGED IN → show Profile + Logout */}
            {status === "authenticated" && (
              <>
                <Link href="/profile" className="btn btn-outline-secondary">
                  {session?.user?.name || "Profile"}
                </Link>

                <button
                  className="btn btn-danger"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
