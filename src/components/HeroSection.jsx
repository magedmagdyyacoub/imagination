"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <header className="hero-section text-center d-flex align-items-center justify-content-center">
      <div className="overlay"></div>
      <div className="container position-relative text-white">
        <h1 className="display-3 fw-bold mb-3 hero-title">
          Create Stunning Images & Videos with AI
        </h1>
        <p className="lead mb-4 hero-subtitle">
          Turn your imagination into powerful visuals using cutting-edge AI tools.
        </p>

        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Link href="/video-generator" className="btn btn-primary btn-lg hero-btn">
            Video Generate
          </Link>
          <Link href="/image-generator" className="btn btn-outline-light btn-lg hero-btn">
            Image Generate
          </Link>
        </div>
      </div>
    </header>
  );
}
