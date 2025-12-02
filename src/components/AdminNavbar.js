"use client";

import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";

export default function AdminNavbar() {
  const [darkMode, setDarkMode] = useState(false);

  // Load theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDarkMode(true);
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else {
      setDarkMode(false);
      document.documentElement.setAttribute("data-bs-theme", "light");
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.setAttribute("data-bs-theme", "light");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.setAttribute("data-bs-theme", "dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <span className="navbar-brand mb-0 h1">Admin Dashboard</span>

      <div className="ms-auto d-flex align-items-center gap-3">
        {/* Dark / Light toggle */}
        <button
          className="btn btn-outline-light btn-sm"
          onClick={toggleTheme}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        {/* Logout */}
        <button
          className="btn btn-danger btn-sm"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
