"use client";

import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="container-fluid py-4">
        <div className="row">

          {/* Sidebar */}
          <div className="col-md-3 mb-3">
            <div className="list-group shadow-sm rounded">
              <button
                className="list-group-item list-group-item-action"
                onClick={() => document.getElementById("profile-info").scrollIntoView()}
              >
                Profile Info
              </button>
              <button
                className="list-group-item list-group-item-action"
                onClick={() => document.getElementById("avatar-section").scrollIntoView()}
              >
                Avatar
              </button>
              <button
                className="list-group-item list-group-item-action"
                onClick={() => document.getElementById("security-section").scrollIntoView()}
              >
                Security
              </button>
      
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-9">

            {/* Avatar Section */}
            <div id="avatar-section" className="card mb-4 shadow-sm">
              <div className="card-body text-center">
                <img
                  src={session?.user?.avatar?.url || session?.user?.image || "/default-avatar.png"}
                  alt="Profile"
                  className="rounded-circle mb-3"
                  style={{ width: "120px", height: "120px", objectFit: "cover" }}
                />

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const file = e.target.avatar.files[0];
                    if (!file) return alert("Please select an image");

                    const formData = new FormData();
                    formData.append("avatar", file);

                    const res = await fetch("/api/upload-avatar", {
                      method: "POST",
                      body: formData,
                    });

                    const data = await res.json();
                    if (data.success) {
                      alert("Profile picture updated!");
                      window.location.reload();
                    } else {
                      alert(data.error);
                    }
                  }}
                >
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    className="form-control mb-3"
                  />
                  <button type="submit" className="btn btn-primary">
                    Upload New Picture
                  </button>
                </form>
              </div>
            </div>

            {/* Profile Info Section */}
            <div id="profile-info" className="card mb-4 shadow-sm">
              <div className="card-body text-center">
                <h2 className="mb-2">{session?.user?.name || session?.user?.email}</h2>
                <p className="text-muted mb-1">Email: {session?.user?.email}</p>
                <p className="text-muted mb-3">Role: {session?.user?.role}</p>
              </div>
            </div>

            {/* Security Section */}
            <div id="security-section" className="card mb-4 shadow-sm">
              <div className="card-body text-center">
                <button className="btn btn-outline-secondary me-2">
                  Change Password
                </button>
                <button className="btn btn-outline-primary">
                  Edit Profile
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
