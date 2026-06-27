import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import BottomNavigation from "@/components/BottomNavigation";
import { UserProvider } from "@/components/UserProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-montserrat",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Kinetic Velocity",
  description: "High-performance fitness tracking PWA",
  manifest: "/manifest.json",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#131313",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen bg-[#0a0a0a] text-[#e5e2e1] flex justify-center items-start">
        {/* Persistent mobile-first container */}
        <div className="w-full max-w-md min-h-screen bg-[#131313] flex flex-col relative border-x border-[#2a2a2a] shadow-2xl overflow-hidden pb-16">
          <main className="flex-1 px-4 py-6 overflow-y-auto">
            <UserProvider>{children}</UserProvider>
          </main>
          <BottomNavigation />
        </div>
      </body>
    </html>
  );
}
