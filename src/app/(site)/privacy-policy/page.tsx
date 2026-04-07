import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getSeoSettings, buildMetadata } from "@/lib/seo";

const sections = [
  {
    title: "Messaging Terms & Conditions",
    paragraphs: [
      '5-Stars Movers Movers | 5 Stars Movers Movers | Phone: (651) 461-9202 | Email: 5starmoversmn@gmail.com',
    ],
  },
  {
    title: "General",
    paragraphs: [
      "When you opt-in to the service, we will send you a message to confirm your signup.",
      "By opting into messages, you agree to receive recurring automated marketing and informational text messages from 5-Stars Movers Movers. Automated messages may be sent using an automatic telephone dialing system to the mobile telephone number you provided when signing up or any other number that you designate.",
      "Message frequency varies, and additional mobile messages may be sent periodically based on your interaction with 5-Stars Movers Movers. 5-Stars Movers Movers reserves the right to alter the frequency of messages sent at any time to increase or decrease the total number of sent messages. 5-Stars Movers Movers also reserves the right to change the short code or phone number where messages are sent.",
      "Message and data rates may apply. If you have any questions about your text plan or data plan, it is best to contact your wireless provider. Your wireless provider is not liable for delayed or undelivered messages.",
      "Your consent to receive marketing messages is not a condition of purchase.",
    ],
  },
  {
    title: "Carriers",
    paragraphs: ["Carriers are not liable for delayed or undelivered messages."],
  },
  {
    title: "Cancellation",
    paragraphs: [
      'You can cancel any time by texting "STOP". After you send the SMS message "STOP", we will send you a message to confirm that you have been unsubscribed and no more messages will be sent. If you would like to receive messages from 5 Stars Movers Movers again, just sign up as you did the first time and we will start sending messages to you again.',
    ],
  },
  {
    title: "Info",
    paragraphs: [
      'Text "HELP" at any time and we will respond with instructions on how to unsubscribe. For support regarding our services, email us at 5starmoversmn@gmail.com.',
      'Transfer of Number  You agree that before changing your mobile number or transferring your mobile number to another individual, you will either reply "STOP" from the original number or notify us of your old number at 5starmoversmn@gmail.com. The duty to inform us based on the above events is a condition of using this service to receive messages.',
    ],
  },
  {
    title: "Privacy",
    paragraphs: [
      "If you have any questions about your data or our privacy practices, please visit our Privacy Policy.",
    ],
  },
  {
    title: "Messaging Terms Changes",
    paragraphs: [
      "We reserve the right to change or terminate our messaging program at any time. We also reserve the right to update these Messaging Terms at any time. Such changes will be effective immediately upon posting. Your continued enrollment following such changes shall constitute your acceptance of such changes.",
    ],
  },
  {
    title: "Information Collection And Use",
    paragraphs: [
      'While using our Site, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include but is not limited to your name, email, and phone number ("Personal Information").',
    ],
  },
  {
    title: "Log Data",
    paragraphs: [
      'Like many site operators, we collect information that your browser sends whenever you visit our Site ("Log Data").',
      'This Log Data may include information such as your computer’s Internet Protocol ("IP") address, browser type, browser version, the pages of our Site that you visit, the time and date of your visit, the time spent on those pages, geographical location, and other statistics.',
      "In addition, we may use third-party services such as Google Analytics that collect, monitor, and analyze this data.",
    ],
  },
  {
    title: "Communications",
    paragraphs: [
      "Cookies are files with a small amount of data, which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your computer’s hard drive.",
      'Like many sites, we use "cookies" to collect information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Site. View our Cookie Policy page >',
    ],
  },
  {
    title: "Security",
    paragraphs: [
      "The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.",
    ],
  },
  {
    title: "Embedded content from other websites",
    paragraphs: [
      "Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.",
      "These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website.",
    ],
  },
  {
    title: "Changes To This Privacy Policy",
    paragraphs: [
      "This Privacy Policy is effective immediately and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page.",
      "We reserve the right to update or change our Privacy Policy at any time and you should check this Privacy Policy periodically. Your continued use of the Service after we post any modifications to the Privacy Policy on this page will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy.",
    ],
  },
  {
    title: "Contact Us",
    paragraphs: [
      "If you have any questions about this Privacy Policy, please visit our contact page or email us at 5starmoversmn@gmail.com.",
    ],
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSettings("/privacy-policy");
  return buildMetadata({
    fallbackTitle: "Privacy Policy | 5 Star Movers",
    fallbackDescription: "Privacy Policy for 5 Star Movers.",
    pagePath: "/privacy-policy",
    seo,
  });
}

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-background text-white">
      <section className="relative overflow-hidden border-b border-white/8 bg-[#121417]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(1,109,99,0.5),transparent_28%),radial-gradient(circle_at_top_right,rgba(255,220,0,0.12),transparent_20%),linear-gradient(135deg,#101316_0%,#121417_42%,#0d2c28_100%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-8 lg:py-28">
          <p className="flex items-center gap-3 font-label text-xs font-bold uppercase tracking-[0.35em] text-[#ffdc00]">
            <span className="h-px w-12 bg-[#ffdc00]" />
            Privacy Policy
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-extrabold leading-[0.95] text-white sm:text-5xl lg:text-7xl">
            Privacy Policy
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-white/62">
            <Link href="/" className="rounded-full border border-white/10 px-4 py-2 hover:border-[#ffdc00]/40 hover:text-white">
              Home
            </Link>
            <span className="text-white/35">/</span>
            <span className="text-white">Privacy Policy</span>
          </div>
          <div className="mt-8 max-w-4xl space-y-4 text-base leading-[1.75] text-white/72">
            <p>
              5-Stars Movers Movers (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;) operates www.5starsmoversmn.com (the &quot;Site&quot;). This page informs you of our policies regarding the collection, use, and disclosure of Personal Information we receive from users of the Site.
            </p>
            <p>
              We use your Personal Information only for providing and improving the Site. By using the Site, you agree to the collection and use of information in accordance with this policy.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#121417] py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 md:px-8 lg:grid-cols-[0.34fr_0.66fr]">
          <aside className="h-fit rounded-[1.6rem] border border-white/8 bg-[#171b1f] p-6 lg:sticky lg:top-28">
            <p className="font-label text-[11px] font-bold uppercase tracking-[0.32em] text-[#ffdc00]">
              On This Page
            </p>
            <div className="mt-5 grid gap-2">
              {sections.map((section) => (
                <a
                  key={section.title}
                  href={`#${section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  className="rounded-xl px-3 py-2 text-sm text-white/62 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </aside>

          <div className="space-y-6">
            {sections.map((section, index) => (
              <section
                key={section.title}
                id={section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                className={`rounded-[1.75rem] border p-7 md:p-8 ${
                  index === 0
                    ? "border-[#016d63]/45 bg-[linear-gradient(135deg,rgba(1,109,99,0.2)_0%,rgba(18,20,23,1)_44%,rgba(18,20,23,1)_100%)]"
                    : "border-white/8 bg-[#171b1f]"
                }`}
              >
                <h2 className="font-display text-2xl font-extrabold text-white md:text-3xl">
                  {section.title}
                </h2>
                <div className="mt-5 space-y-4 text-base leading-[1.8] text-white/72">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
