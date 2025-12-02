"use client";

export default function AdminFooter() {
  return (
    <footer className="text-center py-3 bg-dark text-white mt-5">
      <p>© {new Date().getFullYear()} Admin Dashboard</p>
    </footer>
  );
}
