export default function FeaturesSection() {
  return (
    <section className="py-5 bg-body text-body">
      <div className="container text-center">
        <h2 className="fw-bold mb-4">Powerful AI Features</h2>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="p-4 border rounded-4 bg-body-tertiary">
              <h4>🖼️ Image Generator</h4>
              <p>Create ultra-realistic images from text prompts.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-4 border rounded-4 bg-body-tertiary">
              <h4>🎥 AI Video Creator</h4>
              <p>Generate short videos from text or images.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-4 border rounded-4 bg-body-tertiary">
              <h4>⚡ Fast & Smart</h4>
              <p>Optimized AI for fast, high-quality outputs.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
