"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    alert("Your message has been sent!");
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="center-area">
        <form
          className="p-4 shadow-sm rounded form-light"
          style={{ width: "500px" }}
          onSubmit={sendMessage}
        >
          <h3 className="text-center mb-4">Contact Us</h3>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <textarea
            rows="4"
            className="form-control mb-3"
            placeholder="Your message"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          ></textarea>

          <button className="btn btn-primary w-100">Send Message</button>
        </form>
      </div>

      <Footer />
    </div>
  );
}
