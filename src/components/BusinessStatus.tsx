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

  if (["Mon", "Tue", "Wed", "Thu", "Fri"].includes(weekday)) {
    return minutesIntoDay >= 8 * 60 && minutesIntoDay < 18 * 60;
  }

  if (weekday === "Sat") {
    return minutesIntoDay >= 8 * 60 && minutesIntoDay < 12 * 60;
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
      <span className={`text-sm font-semibold ${isOpen ? "text-emerald-300" : "text-red-300"}`}>
        {isOpen ? "Open Now" : "Closed Now"}
      </span>
    </div>
  );
}
