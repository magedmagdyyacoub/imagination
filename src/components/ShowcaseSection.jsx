"use client";

export default function ShowcaseSection() {
  const images = [
    "/images/2.webp",
    "/images/11.webp",
    "/images/OIP.webp",
    "/images/12.webp",
  
    "/images/do.webp",
    "/images/q.webp",
    "/images/w.webp",
      "/images/d.webp",
  ];

  return (
    <section className="py-5 bg-body text-body border-top">
      <div className="container">
        <h2 className="fw-bold text-center mb-5">AI Generated Gallery</h2>

        <div className="row g-3 gallery-grid">
          {images.map((src, i) => (
            <div
              key={i}
              className={`col-6 col-md-4 ${i === 0 ? "big-img" : "small-img"}`}
            >
              <img
                src={src}
                alt={`AI ${i}`}
                className="img-fluid rounded-4 shadow-sm"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
