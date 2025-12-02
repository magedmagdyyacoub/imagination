"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import AdminNavbar from "@/components/AdminNavbar";
import AdminSidebar from "@/components/AdminSidebar";
import AdminFooter from "@/components/AdminFooter";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (session?.user?.role !== "ADMIN") {
      router.push("/profile");
    }
  }, [status, session]);

  if (status === "loading" || session?.user?.role !== "ADMIN") return null;

  return (
    <div>
      <AdminNavbar />

      <div className="d-flex">
        <AdminSidebar />

        <div className="flex-grow-1 p-4" style={{ marginLeft: "250px" }}>
          <h1 className="mb-4">Welcome, Admin 👑</h1>

          <div className="row">
            <div className="col-md-4">
              <div className="card shadow-sm p-3 mb-4">
                <h4>Total Users</h4>
                <p className="text-muted">Feature coming soon…</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm p-3 mb-4">
                <h4>System Logs</h4>
                <p className="text-muted">Feature coming soon…</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm p-3 mb-4">
                <h4>Settings</h4>
                <p className="text-muted">Feature coming soon…</p>
              </div>
            </div>
          </div>

        

          <AdminFooter />
        </div>
      </div>
    </div>
  );
}
