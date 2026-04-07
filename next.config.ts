import type { NextConfig } from "next";

// ─── Security Headers ────────────────────────────────────────────────────────
// Applied to every response served from this Next.js application.
// HTTPS + HSTS are enforced by Vercel at the edge; these headers add the
// browser-level layer of defence.
const securityHeaders = [
  // Force HTTPS for 2 years; include all subdomains; eligible for preload list
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Prevent MIME-type sniffing attacks
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Block the site from being embedded in iframes (clickjacking protection)
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  // Only send the origin as referrer for cross-origin requests
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Restrict browser feature APIs to the minimum needed
  {
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      "geolocation=(self)",   // allow geolocation only from same origin
      "payment=()",
      "usb=()",
      "interest-cohort=()",   // opt out of Google FLoC
    ].join(", "),
  },
  // Content-Security-Policy
  // Notes:
  //  - Next.js App Router requires 'unsafe-inline' for its hydration scripts.
  //  - Google Fonts requires fonts.googleapis.com + fonts.gstatic.com.
  //  - Supabase API + Storage: *.supabase.co
  //  - img-src 'https:' permits any HTTPS image (cover images from external CDNs).
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "media-src 'self'",
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
      "frame-src 'none'",
      "frame-ancestors 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // Remove the X-Powered-By header so the tech stack is not advertised
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.5starmoversmn.com",
      },
      {
        protocol: "https",
        hostname: "5starmoversmn.com",
      },
      {
        protocol: "https",
        hostname: "commons.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },

  async headers() {
    return [
      {
        // Apply security headers to every route
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
