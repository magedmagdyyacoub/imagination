import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import BootstrapClient from "@/components/BootstrapClient";
import RootClientProvider from "@/components/RootClientProvider"; // ← استخدم Client Wrapper

export const metadata = {
  title: "Imagination",
  description: "Next.js Bootstrap Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-bs-theme="light">
      <body>
        <RootClientProvider>
          <BootstrapClient />  {/* Load bootstrap JS on client */}
          {children}
        </RootClientProvider>
      </body>
    </html>
  );
}
