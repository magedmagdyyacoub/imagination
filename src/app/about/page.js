"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="center-area">
        <div className="container py-5" style={{ maxWidth: "900px" }}>

          {/* Heading */}
          <h2 className="text-center fw-bold mb-3">About Imagination AI</h2>
          <p className="text-center text-muted mb-5" style={{ maxWidth: "600px", margin: "0 auto" }}>
            Learn more about our vision, mission, and the technology behind our AI platform.
          </p>

          {/* Row */}
          <div className="row align-items-center g-4">

            {/* Image Section */}
            <div className="col-md-5 d-flex justify-content-center">
              <div className="about-img shadow-sm rounded overflow-hidden">
                <img
                  src="/images/OIP.webp"
                  alt="AI"
                  className="img-fluid"
                />
              </div>
            </div>

            {/* Text Section */}
            <div className="col-md-7">
              <div className="p-4 shadow-sm rounded form-light">
                <h4 className="fw-semibold mb-3">Who We Are</h4>
                <p className="text-muted">
                  Imagination AI is an advanced creative platform that empowers users to generate
                  professional-quality images and videos using cutting-edge artificial intelligence models.
                </p>

                <h4 className="fw-semibold mt-4 mb-3">Our Mission</h4>
                <p className="text-muted">
                  We aim to make creative tools accessible for everyone —
                  from designers and marketers to everyday users with big ideas.
                  Our AI technologies help you turn imagination into reality within seconds.
                </p>

                <h4 className="fw-semibold mt-4 mb-3">Why Choose Us?</h4>
                <ul className="text-muted">
                  <li>Fast & high-quality AI output</li>
                  <li>User-friendly tools for all skill levels</li>
                  <li>AI image, video, and enhancement services</li>
                  <li>Constant updates and new AI features</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
