import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Poppins, Work_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

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
  title: {
    default: "5 Star Movers | Premium Moving Services in Minnesota",
    template: "%s | 5 Star Movers Minnesota",
  },
  description: "Minnesota's most trusted movers. 5-star rated, upfront pricing, and expert crews.",
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
      <body suppressHydrationWarning className="min-h-full">
        {children}
      </body>
    </html>
  );
}
