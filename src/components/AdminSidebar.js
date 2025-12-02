"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function AdminSidebar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    setDarkMode(theme === "dark");
  }, []);

  return (
    <div
      className={`border-end d-flex flex-column p-3`}
      style={{
        width: "250px",
        minHeight: "100vh",
        position: "fixed",
        backgroundColor: darkMode ? "#343a40" : "#f8f9fa",
        color: darkMode ? "#f8f9fa" : "#212529",
      }}
    >
      <h4>Menu</h4>

      <ul className="list-unstyled mt-4">
        <li className="mb-2">
          <Link
            href="/admin"
            className={`text-decoration-none ${darkMode ? "text-light" : "text-dark"}`}
          >
            Dashboard
          </Link>
        </li>
        <li className="mb-2">
          <Link
            href="/admin/users"
            className={`text-decoration-none ${darkMode ? "text-light" : "text-dark"}`}
          >
            Manage Users
          </Link>
        </li>
      </ul>
    </div>
  );
}
