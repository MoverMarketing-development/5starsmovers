import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Poppins, Work_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["700", "800", "900"],
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-label",
});

export const metadata: Metadata = {
  title: "5 Star Movers | Premium Moving Services in Minnesota",
  description:
    "Editorial-style moving homepage for 5 Star Movers with premium service messaging, transparent pricing, and Minneapolis moving expertise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full dark antialiased font-sans",
        inter.variable,
        plusJakartaSans.variable,
        poppins.variable,
        workSans.variable
      )}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <Navbar />
        <div className="flex-1 pt-17 md:pt-22">{children}</div>
      </body>
    </html>
  );
}
