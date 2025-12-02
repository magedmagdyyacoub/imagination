"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const generateImage = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return alert("Please enter a description");

    setLoading(true);
    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, count: 3 }),
      });

      const data = await res.json();

      if (data.images?.length) {
        setImages(data.images);
        setHistory((prev) => [...data.images, ...prev]); // save new images in history
      } else {
        alert("Failed to generate images");
      }
    } catch (err) {
      console.error(err);
      alert("Error generating images");
    }
    setLoading(false);
  };

  const copyLink = (url) => {
    navigator.clipboard.writeText(url);
    alert("Image URL copied!");
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="center-area my-5 d-flex flex-column align-items-center">
        <div
          className="p-4 shadow-sm rounded form-light w-100"
          style={{ maxWidth: "600px" }}
        >
          <h3 className="text-center mb-4">AI Image Generator</h3>

          <form onSubmit={generateImage}>
            <textarea
              className="form-control mb-3"
              rows={4}
              placeholder="Describe the images you want..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button className="btn btn-success w-100 mb-3" disabled={loading}>
              {loading ? "Generating..." : "Generate Images"}
            </button>
          </form>

          {/* Display generated images */}
          <div className="text-center mt-4 d-flex flex-wrap justify-content-center gap-3">
            {loading && (
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}

            {!loading &&
              images.map((url, i) => (
                <div key={i} className="position-relative">
                  <img
                    src={url}
                    alt={`Generated ${i + 1}`}
                    className="img-fluid rounded"
                    style={{ maxHeight: "300px", display: "block" }}
                  />
                  <div className="d-flex justify-content-center gap-2 mt-2">
                    <a
                      href={url}
                      download={`AI_image_${i + 1}.png`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      Download
                    </a>
                    <button
                      onClick={() => copyLink(url)}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Copy Link
                    </button>
                  </div>
                </div>
              ))}

            {!loading && images.length === 0 && (
              <p className="text-muted">Generated images will appear here.</p>
            )}
          </div>

          {/* Gallery history */}
          {history.length > 0 && (
            <div className="gallery mt-5">
              <h5 className="text-center mb-3">Previous Generated Images</h5>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                {history.map((url, i) => (
                  <div key={i} className="position-relative">
                    <img
                      src={url}
                      alt={`History ${i + 1}`}
                      className="img-fluid rounded"
                      style={{ maxHeight: "150px" }}
                    />
                    <div className="d-flex justify-content-center gap-2 mt-1">
                      <a
                        href={url}
                        download={`AI_image_${i + 1}.png`}
                        className="btn btn-sm btn-outline-primary"
                      >
                        Download
                      </a>
                      <button
                        onClick={() => copyLink(url)}
                        className="btn btn-sm btn-outline-secondary"
                      >
                        Copy Link
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
