import type { Metadata, Viewport } from "next";
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
  title: "OFF THE LIMITS",
  description: "High-performance fitness tracking PWA",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#131313",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable} h-full overflow-hidden antialiased`}
    >
      <head>
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png"></link>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="h-full overflow-hidden bg-[#0a0a0a] text-[#e5e2e1] flex justify-center items-start">
        {/* Persistent mobile-first container */}
        <div className="w-full max-w-md h-full bg-[#131313] flex flex-col relative border-x border-[#2a2a2a] shadow-2xl overflow-hidden pb-[calc(4rem+env(safe-area-inset-bottom,0px))]">
          <main className="flex-1 px-4 pt-[calc(1.5rem+env(safe-area-inset-top,0px))] pb-6 overflow-y-auto flex flex-col">
            <UserProvider>{children}</UserProvider>
          </main>
          <BottomNavigation />
        </div>
      </body>
    </html>
  );
}
