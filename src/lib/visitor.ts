/**
 * Visitor tracking cookie utilities.
 *
 * Cookie name : _5sm_v
 * Cookie value: JSON  { c: <visit count>, f: <first visit ISO>, l: <last visit ISO> }
 * Lifetime    : 365 days
 *
 * SEO rationale:
 *   Google treats returning visitors as a quality signal — longer sessions,
 *   lower bounce rate, and repeated engagement all improve ranking. By
 *   recognising returning visitors we can personalise CTAs and content to
 *   keep them engaged for longer.
 */

const COOKIE_NAME = "_5sm_v";
const MAX_AGE = 60 * 60 * 24 * 365; // 1 year in seconds

export interface VisitorData {
  /** Total number of visits (1 = first visit) */
  c: number;
  /** ISO timestamp of first visit */
  f: string;
  /** ISO timestamp of most recent visit */
  l: string;
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, maxAge: number) {
  document.cookie = [
    `${name}=${encodeURIComponent(value)}`,
    `max-age=${maxAge}`,
    "path=/",
    "SameSite=Lax",
    location.protocol === "https:" ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");
}

/**
 * Called once on page load. Reads the existing cookie, increments the
 * visit count, writes it back, and returns the updated visitor data.
 */
export function recordVisit(): VisitorData {
  const now = new Date().toISOString();
  const raw = getCookie(COOKIE_NAME);

  let data: VisitorData;

  if (raw) {
    try {
      const parsed = JSON.parse(raw) as VisitorData;
      data = { c: (parsed.c || 0) + 1, f: parsed.f || now, l: now };
    } catch {
      data = { c: 2, f: now, l: now };
    }
  } else {
    data = { c: 1, f: now, l: now };
  }

  setCookie(COOKIE_NAME, JSON.stringify(data), MAX_AGE);
  return data;
}

/** Returns the current visitor data without modifying the cookie. */
export function readVisitor(): VisitorData | null {
  const raw = getCookie(COOKIE_NAME);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as VisitorData;
  } catch {
    return null;
  }
}

/** True when the user has visited the site at least twice. */
export function isReturningVisitor(): boolean {
  const v = readVisitor();
  return v !== null && v.c >= 2;
}
