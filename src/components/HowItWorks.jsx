export default function HowItWorks() {
  return (
    <section className="py-5 bg-body text-body">
      <div className="container text-center">
        <h2 className="fw-bold mb-4">How It Works</h2>

        <div className="row g-4">
          <div className="col-md-3">
            <div className="p-4 border rounded-4 bg-body-tertiary">
              <h4>1. Write a Prompt</h4>
              <p>Describe what you want to create.</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="p-4 border rounded-4 bg-body-tertiary">
              <h4>2. Choose Style</h4>
              <p>Select an art style or theme.</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="p-4 border rounded-4 bg-body-tertiary">
              <h4>3. Generate</h4>
              <p>AI creates images or videos instantly.</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="p-4 border rounded-4 bg-body-tertiary">
              <h4>4. Download</h4>
              <p>Save high-quality results anytime.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
