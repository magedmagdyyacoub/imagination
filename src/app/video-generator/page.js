"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function VideoGenerator() {
  const [prompt, setPrompt] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const generateVideo = async (e) => {
    e.preventDefault();
    if (!prompt) return alert("Please enter a description");

    setLoading(true);
    setVideoUrl(""); // إزالة الفيديو القديم أثناء التحميل
    try {
      const res = await fetch("/api/generate-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      if (data.videoUrl) {
        setVideoUrl(data.videoUrl);
      } else {
        alert("Failed to generate video");
      }
    } catch (err) {
      console.error(err);
      alert("Error generating video");
    }
    setLoading(false);
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="center-area my-5 d-flex flex-column align-items-center">
        <div className="p-4 shadow-sm rounded form-light w-100" style={{ maxWidth: "600px" }}>
          <h3 className="text-center mb-4">AI Video Generator</h3>

          <form onSubmit={generateVideo}>
            <textarea
              className="form-control mb-3"
              rows="4"
              placeholder="Describe the video you want..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            ></textarea>

            <button className="btn btn-warning w-100 mb-3" disabled={loading}>
              {loading ? "Generating..." : "Generate Video"}
            </button>
          </form>

          {/* عرض الفيديو أو Spinner */}
          <div className="text-center mt-4">
            {loading && <div className="spinner-border text-warning" role="status"></div>}
            {!loading && videoUrl && (
              <div className="d-flex flex-column align-items-center">
                <video controls className="rounded" style={{ maxWidth: "100%", maxHeight: "400px" }}>
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <a href={videoUrl} download="AI_generated_video.mp4" className="btn btn-sm btn-outline-warning mt-2">
                  Download Video
                </a>
              </div>
            )}
            {!loading && !videoUrl && <p className="text-muted">Generated video preview will appear here.</p>}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
