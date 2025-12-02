"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import AdminNavbar from "@/components/AdminNavbar";
import AdminSidebar from "@/components/AdminSidebar";
import AdminFooter from "@/components/AdminFooter";

export default function ManageUsers() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (status === "loading") return;

    if (session?.user?.role !== "ADMIN") {
      router.push("/profile");
      return;
    }

    fetchUsers();
  }, [status]);

  async function fetchUsers() {
    const res = await fetch("/api/admin/get-users");
    const data = await res.json();
    setUsers(data.users);
  }

  async function changeRole(id, newRole) {
    await fetch("/api/admin/change-role", {
      method: "POST",
      body: JSON.stringify({ id, role: newRole }),
    });

    fetchUsers();
  }

  if (status === "loading") return null;

  return (
    <div>
      <AdminNavbar />

      <div className="d-flex">
        <AdminSidebar />

        <div className="flex-grow-1 p-4" style={{ marginLeft: "250px" }}>
          <h2>Manage Users</h2>

          <table className="table table-striped mt-4">
            <thead>
              <tr>
                <th>Email</th>
                <th>Role</th>
                <th>Change Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    <select
                      className="form-select"
                      defaultValue={u.role}
                      onChange={(e) => changeRole(u.id, e.target.value)}
                    >
                      <option value="USER">USER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <AdminFooter />
        </div>
      </div>
    </div>
  );
}
