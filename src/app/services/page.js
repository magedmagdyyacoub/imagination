"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Services() {
  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="center-area">
        <div className="container py-5">
          <h2 className="text-center fw-bold mb-4">What We Offer</h2>
          <p className="text-center text-muted mb-5" style={{ maxWidth: "600px", margin: "0 auto" }}>
            Explore our powerful AI tools designed to help you create stunning visuals and videos instantly.
          </p>

          <div className="row g-4">

            {/* Service 1 */}
            <div className="col-md-4">
              <div className="service-card p-4 shadow-sm rounded form-light text-center h-100">
                <div className="icon-circle mb-3">
                  <i className="bi bi-image fs-1"></i>
                </div>
                <h4 className="fw-semibold">AI Image Generator</h4>
                <p className="text-muted">
                  Turn your ideas into stunning AI-generated images simply by describing what you imagine.
                </p>
              </div>
            </div>

            {/* Service 2 */}
            <div className="col-md-4">
              <div className="service-card p-4 shadow-sm rounded form-light text-center h-100">
                <div className="icon-circle mb-3">
                  <i className="bi bi-film fs-1"></i>
                </div>
                <h4 className="fw-semibold">AI Video Generator</h4>
                <p className="text-muted">
                  Create short, high-quality videos from text prompts using modern AI video tools.
                </p>
              </div>
            </div>

            {/* Service 3 */}
            <div className="col-md-4">
              <div className="service-card p-4 shadow-sm rounded form-light text-center h-100">
                <div className="icon-circle mb-3">
                  <i className="bi bi-magic fs-1"></i>
                </div>
                <h4 className="fw-semibold">AI Photo Enhancement</h4>
                <p className="text-muted">
                  Enhance, upscale, and improve images with advanced AI restoration features.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
