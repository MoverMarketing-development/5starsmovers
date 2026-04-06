import Link from "next/link";
import { servicePages } from "@/lib/service-pages";

type IconName =
  | "home"
  | "route"
  | "building"
  | "box"
  | "heart"
  | "package"
  | "apartment"
  | "squares"
  | "warehouse"
  | "sparkles"
  | "shield"
  | "trash"
  | "arrow";

function Icon({ name, className }: { name: IconName; className?: string }) {
  const shared = { className, fill: "none", stroke: "currentColor", strokeWidth: 1.8, viewBox: "0 0 24 24" };

  switch (name) {
    case "home": return <svg {...shared}><path d="M4 10.5 12 4l8 6.5V20H4v-9.5Z" /><path d="M9 20v-5h6v5" /></svg>;
    case "route": return <svg {...shared}><path d="M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm12-10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" /><path d="M8 17h3a4 4 0 0 0 4-4V9" /><path d="M15 9h1" /></svg>;
    case "building": return <svg {...shared}><path d="M4 20V6l8-2 8 2v14" /><path d="M9 9h.01M9 13h.01M9 17h.01M15 9h.01M15 13h.01M15 17h.01" /></svg>;
    case "box": return <svg {...shared}><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" /><path d="M12 12 4 7.5M12 12l8-4.5M12 12v9" /></svg>;
    case "heart": return <svg {...shared}><path d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 5.65-7 10-7 10Z" /></svg>;
    case "package": return <svg {...shared}><path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z" /><path d="M4 7.5V16.5L12 21l8-4.5V7.5" /><path d="M12 12v9" /></svg>;
    case "apartment": return <svg {...shared}><path d="M6 20V5h12v15" /><path d="M9 8h.01M12 8h.01M15 8h.01M9 12h.01M12 12h.01M15 12h.01M11 20v-4h2v4" /></svg>;
    case "squares": return <svg {...shared}><path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" /></svg>;
    case "warehouse": return <svg {...shared}><path d="m3 10 9-6 9 6v10H3V10Z" /><path d="M7 14h10M7 17h10" /></svg>;
    case "sparkles": return <svg {...shared}><path d="m12 3 1.4 3.6L17 8l-3.6 1.4L12 13l-1.4-3.6L7 8l3.6-1.4L12 3ZM18.5 14l.82 2.18L21.5 17l-2.18.82L18.5 20l-.82-2.18L15.5 17l2.18-.82L18.5 14ZM6 14l.82 2.18L9 17l-2.18.82L6 20l-.82-2.18L3 17l2.18-.82L6 14Z" /></svg>;
    case "shield": return <svg {...shared}><path d="M12 3 5 6v5c0 5 3.5 8.5 7 10 3.5-1.5 7-5 7-10V6l-7-3Z" /></svg>;
    case "trash": return <svg {...shared}><path d="M4 7h16" /><path d="M9 7V4h6v3" /><path d="M7 7l1 13h8l1-13" /></svg>;
    case "arrow": return <svg {...shared}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>;
  }
}

export default function ServiceGridSection() {
  return (
    <section id="services" className="border-t border-white/5 bg-[#121417] py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-14 text-center">
          <p className="font-label text-xs font-bold uppercase tracking-[0.35em] text-[#ffdc00]">Our Service</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold text-white md:text-5xl">We Serve the Best Work</h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {servicePages.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="ambient-shadow group rounded-[1.5rem] border border-white/[0.06] bg-[#1e2124] p-6 transition-transform duration-300 hover:-translate-y-1 hover:border-[#ffdc00]/25"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#ffdc00]/10 text-[#ffdc00]">
                <Icon name={service.icon} className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-extrabold text-white">{service.title}</h3>
              <p className="mt-3 text-sm leading-[1.5] text-white/[0.58]">{service.description}</p>
              <div className="mt-6 flex items-center gap-2 font-label text-[11px] font-bold uppercase tracking-[0.24em] text-[#ffdc00]">
                Learn more
                <Icon name="arrow" className="h-3.5 w-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
