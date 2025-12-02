export default function Footer() {
  return (
    <footer className="py-4 bg-body-tertiary mt-5 border-top">
      <div className="container text-center text-body">
        <p className="mb-1">&copy; {new Date().getFullYear()} Imagination AI</p>
        <small>All rights reserved.</small>
      </div>
    </footer>
  );
}
