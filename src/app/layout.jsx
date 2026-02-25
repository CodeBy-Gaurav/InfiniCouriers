import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Infini Couriers - Swift. Secure. Seamless Delivery Solutions",
  description: "Track your shipments in real-time with Infini Couriers. Professional courier services with instant updates from Delhivery and more.",
  keywords: ["courier tracking", "package delivery", "Delhivery", "shipping", "logistics"],
  openGraph: {
    title: "Infini Couriers - Real-Time Package Tracking",
    description: "Monitor deliveries with instant updates. Swift, secure, and seamless delivery solutions.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
