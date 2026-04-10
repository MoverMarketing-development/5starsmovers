"use client";

import { useEffect, useState } from "react";

function getBusinessOpenState(now: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const weekday = parts.find((part) => part.type === "weekday")?.value ?? "Mon";
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? "0");
  const minutesIntoDay = hour * 60 + minute;

  if (["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].includes(weekday)) {
    return minutesIntoDay >= 8 * 60 && minutesIntoDay < 18 * 60 + 30;
  }

  if (weekday === "Sun") {
    return minutesIntoDay >= 9 * 60 && minutesIntoDay < 17 * 60;
  }

  return false;
}

export default function BusinessStatus() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const syncState = () => setIsOpen(getBusinessOpenState(new Date()));

    syncState();
    const intervalId = window.setInterval(syncState, 60_000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="flex items-center gap-2.5">
      <span
        className={[
          "inline-flex h-2.5 w-2.5 rounded-full",
          isOpen ? "animate-pulse bg-emerald-400" : "bg-red-400",
        ].join(" ")}
      />
      <span className={`text-sm font-extrabold uppercase tracking-[0.12em] ${isOpen ? "text-white" : "text-red-200"}`}>
        {isOpen ? "Open Now" : "Closed Now"}
      </span>
    </div>
  );
}
