import Navbar from "@/components/Navbar";
import HeadHtmlLoader from "@/components/HeadHtmlLoader";
import VisitorTracker from "@/components/VisitorTracker";
import CookieBanner from "@/components/CookieBanner";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <HeadHtmlLoader />
      <VisitorTracker />
      <CookieBanner />
      <Navbar />
      <div className="flex-1 pt-20 md:pt-22">{children}</div>
    </div>
  );
}
