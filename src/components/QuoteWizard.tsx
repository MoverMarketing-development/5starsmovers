"use client";

import { startTransition, useMemo, useState } from "react";

type QuoteFormState = {
  fromAddress: string;
  toAddress: string;
  moveDate: string;
  moveSize: string;
  serviceType: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
  acceptedTerms: boolean;
};

const initialState: QuoteFormState = {
  fromAddress: "",
  toAddress: "",
  moveDate: "",
  moveSize: "",
  serviceType: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  notes: "",
  acceptedTerms: false,
};

const moveSizes = [
  "Studio / 1 Bedroom",
  "2 Bedrooms",
  "3 Bedrooms",
  "4+ Bedrooms",
  "Office / Commercial",
];

const serviceTypes = [
  "Local Moving",
  "Long Distance",
  "Packing + Moving",
  "Labor Only",
  "White Glove",
];

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, amount: number) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + amount);
  return startOfDay(nextDate);
}

function formatDateValue(date: Date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function formatDateLabel(dateString: string) {
  if (!dateString) return "Choose a move date";

  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function parseDateValue(dateString: string) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function isSameDay(first: Date, second: Date) {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
}

function getMonthDays(monthDate: Date) {
  const firstDay = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
  const firstWeekDay = firstDay.getDay();
  const daysInMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate();

  return Array.from({ length: 42 }, (_, index) => {
    const dayOffset = index - firstWeekDay;
    return new Date(monthDate.getFullYear(), monthDate.getMonth(), dayOffset + 1);
  }).slice(0, Math.ceil((firstWeekDay + daysInMonth) / 7) * 7);
}

const steps = [
  {
    id: 1,
    eyebrow: "Step 01",
    title: "Where are you moving from and to?",
    description: "Start with the route so we can shape the quote around distance, access, and logistics.",
  },
  {
    id: 2,
    eyebrow: "Step 02",
    title: "Tell us the move details",
    description: "Choose your timeline, move size, and service style so the quote feels tailored from the start.",
  },
  {
    id: 3,
    eyebrow: "Step 03",
    title: "How can we reach you?",
    description: "Leave your contact details and accept the terms so we can send a polished estimate quickly.",
  },
  {
    id: 4,
    eyebrow: "Step 04",
    title: "Review your quote request",
    description: "Check every detail before sending. If anything looks off, go back and correct it first.",
  },
];

function ProgressIcon({ active }: { active: boolean }) {
  return (
    <span
      className={[
        "flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300",
        active
          ? "border-[#ffdc00] bg-[#ffdc00] text-[#121417] shadow-[0_16px_34px_rgba(255,220,0,0.24)]"
          : "border-white/10 bg-white/[0.04] text-white/55",
      ].join(" ")}
    >
      <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </svg>
    </span>
  );
}

function LockIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M7 11V8a5 5 0 0 1 10 0v3" />
      <rect x="5" y="11" width="14" height="10" rx="2" />
    </svg>
  );
}

function FieldShell({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="font-label text-[11px] font-bold uppercase tracking-[0.24em] text-white/58">
        {label}
      </span>
      {hint ? <span className="mt-2 block text-sm text-white/45">{hint}</span> : null}
      <div className="mt-3">{children}</div>
    </label>
  );
}

const inputClassName =
  "w-full rounded-[1.1rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-base text-white placeholder:text-white/28 outline-none transition-all duration-300 focus:border-[#ffdc00]/55 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(255,220,0,0.08)]";

const cardOptionClassName =
  "group cursor-pointer rounded-[1.25rem] border px-5 py-5 text-left transition-all duration-300";

export default function QuoteWizard() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState<QuoteFormState>(initialState);
  const today = useMemo(() => startOfDay(new Date()), []);
  const minSelectableDate = useMemo(() => addDays(today, 2), [today]);
  const earliestVisibleMonth = useMemo(
    () => new Date(minSelectableDate.getFullYear(), minSelectableDate.getMonth(), 1),
    [minSelectableDate]
  );
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(
    () => new Date(minSelectableDate.getFullYear(), minSelectableDate.getMonth(), 1)
  );

  const progress = useMemo(() => (step / steps.length) * 100, [step]);
  const calendarDays = useMemo(() => getMonthDays(visibleMonth), [visibleMonth]);
  const canGoToPreviousMonth = useMemo(() => {
    return (
      visibleMonth.getFullYear() > earliestVisibleMonth.getFullYear() ||
      (visibleMonth.getFullYear() === earliestVisibleMonth.getFullYear() &&
        visibleMonth.getMonth() > earliestVisibleMonth.getMonth())
    );
  }, [earliestVisibleMonth, visibleMonth]);

  function updateField<K extends keyof QuoteFormState>(key: K, value: QuoteFormState[K]) {
    setFormState((current) => ({ ...current, [key]: value }));
  }

  function goToStep(nextStep: number) {
    startTransition(() => {
      setStep(nextStep);
    });
  }

  function canContinueFromStep(currentStep: number) {
    if (currentStep === 1) {
      return formState.fromAddress && formState.toAddress;
    }

    if (currentStep === 2) {
      return formState.moveDate && formState.moveSize && formState.serviceType;
    }

    return (
      formState.firstName &&
      formState.lastName &&
      formState.email &&
      formState.phone &&
      formState.acceptedTerms
    );
  }

  function isStepUnlocked(targetStep: number) {
    if (targetStep === 1) return true;
    if (targetStep === 2) return !!canContinueFromStep(1);
    if (targetStep === 3) return !!canContinueFromStep(1) && !!canContinueFromStep(2);
    if (targetStep === 4) {
      return !!canContinueFromStep(1) && !!canContinueFromStep(2) && !!canContinueFromStep(3);
    }
    return false;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canContinueFromStep(3)) {
      return;
    }

    setSubmitted(true);
  }
  const reviewSections = [
    {
      title: "Moving Route",
      items: [
        { label: "Moving From", value: formState.fromAddress },
        { label: "Moving To", value: formState.toAddress },
      ],
    },
    {
      title: "Move Details",
      items: [
        { label: "Preferred Move Date", value: formatDateLabel(formState.moveDate) },
        { label: "Move Size", value: formState.moveSize },
        { label: "Service Type", value: formState.serviceType },
      ],
    },
    {
      title: "Contact Info",
      items: [
        { label: "First Name", value: formState.firstName },
        { label: "Last Name", value: formState.lastName },
        { label: "Email", value: formState.email },
        { label: "Phone", value: formState.phone },
        { label: "Notes", value: formState.notes || "No additional notes" },
      ],
    },
  ];

  const stepContent = [
    <div key="step-1" className="grid gap-6">
      <FieldShell label="Moving From" hint="Current pickup address">
        <input
          className={inputClassName}
          name="fromAddress"
          placeholder="Street address"
          required
          value={formState.fromAddress}
          onChange={(event) => updateField("fromAddress", event.target.value)}
        />
      </FieldShell>
      <FieldShell label="Moving To" hint="Destination address">
        <input
          className={inputClassName}
          name="toAddress"
          placeholder="Street address"
          required
          value={formState.toAddress}
          onChange={(event) => updateField("toAddress", event.target.value)}
        />
      </FieldShell>
    </div>,
    <div key="step-2" className="grid gap-6">
      <FieldShell label="Preferred Move Date" hint="Choose the date that feels best right now">
        <div className="relative">
          <button
            type="button"
            className={`${inputClassName} flex cursor-pointer items-center justify-between text-left`}
            onClick={() => setIsDatePickerOpen((current) => !current)}
          >
            <span className={formState.moveDate ? "text-white" : "text-white/28"}>
              {formatDateLabel(formState.moveDate)}
            </span>
            <svg className="h-5 w-5 text-[#ffdc00]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M16 3v4M8 3v4M3 10h18" />
            </svg>
          </button>

          {isDatePickerOpen ? (
            <div className="absolute left-0 z-30 mt-3 w-full rounded-[1.5rem] border border-white/10 bg-[#1b1d20] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
              <div className="mb-4 flex items-center justify-between">
                <button
                  type="button"
                  className={[
                    "flex h-10 w-10 items-center justify-center rounded-full border bg-white/[0.03] transition-colors",
                    canGoToPreviousMonth
                      ? "cursor-pointer border-white/10 text-white/70 hover:border-white/18 hover:bg-white/[0.06]"
                      : "cursor-not-allowed border-white/6 text-white/20",
                  ].join(" ")}
                  disabled={!canGoToPreviousMonth}
                  onClick={() =>
                    setVisibleMonth(
                      (current) => new Date(current.getFullYear(), current.getMonth() - 1, 1)
                    )
                  }
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="m15 6-6 6 6 6" />
                  </svg>
                </button>

                <p className="font-display text-lg font-bold text-white">
                  {visibleMonth.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>

                <button
                  type="button"
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition-colors hover:border-white/18 hover:bg-white/[0.06]"
                  onClick={() =>
                    setVisibleMonth(
                      (current) => new Date(current.getFullYear(), current.getMonth() + 1, 1)
                    )
                  }
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="m9 6 6 6-6 6" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {weekDays.map((day) => (
                  <span
                    key={day}
                    className="pb-2 text-center font-label text-[10px] font-bold uppercase tracking-[0.24em] text-white/35"
                  >
                    {day}
                  </span>
                ))}

                {calendarDays.map((date) => {
                  const isInVisibleMonth = date.getMonth() === visibleMonth.getMonth();
                  const isBlocked = date.getTime() < minSelectableDate.getTime();
                  const isSelected = formState.moveDate
                    ? isSameDay(date, parseDateValue(formState.moveDate))
                    : false;

                  return (
                    <button
                      key={date.toISOString()}
                      type="button"
                      disabled={isBlocked}
                      className={[
                        "flex aspect-square items-center justify-center rounded-full text-sm font-semibold transition-all duration-200",
                        isSelected
                          ? "cursor-pointer bg-[#ffdc00] text-[#121417] shadow-[0_12px_26px_rgba(255,220,0,0.22)]"
                          : isBlocked
                            ? "cursor-not-allowed text-white/15"
                            : isInVisibleMonth
                              ? "cursor-pointer text-white/75 hover:bg-white/[0.08] hover:text-white"
                              : "cursor-pointer text-white/25 hover:bg-white/[0.05]",
                      ].join(" ")}
                      onClick={() => {
                        updateField("moveDate", formatDateValue(date));
                        setIsDatePickerOpen(false);
                      }}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>

              <p className="mt-4 text-xs leading-[1.5] text-white/42">
                Available dates start after the next two days to give the team enough time to prepare.
              </p>
            </div>
          ) : null}
        </div>
      </FieldShell>

      <FieldShell label="Move Size" hint="Select the scale of the move">
        <div className="grid gap-4 md:grid-cols-2">
          {moveSizes.map((size) => {
            const active = formState.moveSize === size;
            return (
              <button
                key={size}
                className={[
                  cardOptionClassName,
                  active
                    ? "border-[#ffdc00]/35 bg-[#ffdc00]/10 text-white"
                    : "border-white/10 bg-white/[0.03] text-white/68 hover:border-white/18 hover:bg-white/[0.05]",
                ].join(" ")}
                type="button"
                onClick={() => updateField("moveSize", size)}
              >
                <span className="font-display text-lg font-bold">{size}</span>
              </button>
            );
          })}
        </div>
      </FieldShell>

      <FieldShell label="Service Type" hint="Choose the level of support you want">
        <div className="grid gap-4 md:grid-cols-2">
          {serviceTypes.map((service) => {
            const active = formState.serviceType === service;
            return (
              <button
                key={service}
                className={[
                  cardOptionClassName,
                  active
                    ? "border-[#ffdc00]/35 bg-[#ffdc00]/10 text-white"
                    : "border-white/10 bg-white/[0.03] text-white/68 hover:border-white/18 hover:bg-white/[0.05]",
                ].join(" ")}
                type="button"
                onClick={() => updateField("serviceType", service)}
              >
                <span className="font-display text-lg font-bold">{service}</span>
              </button>
            );
          })}
        </div>
      </FieldShell>
    </div>,
    <div key="step-3" className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        <FieldShell label="First Name">
          <input
            className={inputClassName}
            name="firstName"
            placeholder="First name"
            required
            value={formState.firstName}
            onChange={(event) => updateField("firstName", event.target.value)}
          />
        </FieldShell>
        <FieldShell label="Last Name">
          <input
            className={inputClassName}
            name="lastName"
            placeholder="Last name"
            required
            value={formState.lastName}
            onChange={(event) => updateField("lastName", event.target.value)}
          />
        </FieldShell>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FieldShell label="Email">
          <input
            className={inputClassName}
            name="email"
            placeholder="you@example.com"
            required
            type="email"
            value={formState.email}
            onChange={(event) => updateField("email", event.target.value)}
          />
        </FieldShell>
        <FieldShell label="Phone">
          <input
            className={inputClassName}
            name="phone"
            placeholder="(651) 555-0199"
            required
            type="tel"
            value={formState.phone}
            onChange={(event) => updateField("phone", event.target.value)}
          />
        </FieldShell>
      </div>

      <FieldShell label="Additional Notes" hint="Optional details like stairs, elevators, or preferred timing">
        <textarea
          className={`${inputClassName} min-h-32 resize-none`}
          name="notes"
          placeholder="Tell us anything that would help us quote more accurately."
          value={formState.notes}
          onChange={(event) => updateField("notes", event.target.value)}
        />
      </FieldShell>

      <label className="flex cursor-pointer items-start gap-4 rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm leading-[1.5] text-white/62">
        <input
          checked={formState.acceptedTerms}
          className="mt-1 h-4 w-4 cursor-pointer rounded border-white/20 bg-transparent accent-[#ffdc00]"
          name="acceptedTerms"
          required
          type="checkbox"
          onChange={(event) => updateField("acceptedTerms", event.target.checked)}
        />
        <span>
          I agree to the terms and conditions and understand that 5 Star Movers may contact me by phone, email, or text to follow up on this quote request.
        </span>
      </label>
    </div>,
    <div key="step-4" className="grid gap-6">
      {reviewSections.map((section) => (
        <div
          key={section.title}
          className="border-b border-white/10 pb-6 last:border-b-0 last:pb-0"
        >
          <p className="font-label text-[11px] font-bold uppercase tracking-[0.24em] text-[#ffdc00]">
            {section.title}
          </p>
          <div className="mt-4">
            {section.items.map((item) => (
              <div
                key={`${section.title}-${item.label}`}
                className="flex flex-col gap-2 border-b border-white/8 py-4 last:border-b-0 last:pb-0 first:pt-0"
              >
                <p className="font-label text-[10px] font-bold uppercase tracking-[0.22em] text-white/42">
                  {item.label}
                </p>
                <p className="mt-2 text-sm leading-[1.5] text-white/82">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>,
  ];

  return (
    <section className="relative overflow-hidden bg-[#121417]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,220,0,0.08),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(0,104,94,0.16),transparent_28%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/6" />

      <div
        className={[
          "relative mx-auto grid max-w-7xl gap-8 px-4 py-14 md:px-8 lg:py-20",
          submitted ? "lg:max-w-3xl" : "lg:grid-cols-[0.9fr_1.1fr]",
        ].join(" ")}
      >
        {!submitted ? (
          <aside className="glass-panel ambient-shadow rounded-[2rem] border border-white/10 p-8 lg:p-10">
          <p className="font-label text-[11px] font-bold uppercase tracking-[0.3em] text-[#ffdc00]">
            Quote Journey
          </p>
          <h1 className="mt-5 max-w-md font-display text-4xl font-extrabold leading-[1] text-white md:text-5xl">
            A quote flow that feels premium before the move even starts.
          </h1>
          <p className="mt-5 max-w-md text-base leading-[1.5] text-white/58">
            Each step is designed to feel calm, guided, and surprisingly easy to complete. No clutter, no intimidation, just momentum.
          </p>

          <div className="mt-8 h-2 w-full overflow-hidden rounded-full bg-white/8">
            <div
              className="h-full rounded-full bg-[linear-gradient(135deg,#ffdc00_0%,#e5c600_100%)] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-8 space-y-5">
            {steps.map((item) => {
              const isActive = item.id === step;
              const isComplete = item.id < step;
              const isUnlocked = isStepUnlocked(item.id);
              const isLocked = !isUnlocked;

              return (
                <button
                  key={item.id}
                  type="button"
                  disabled={isLocked}
                  onClick={() => {
                    if (!isLocked) {
                      goToStep(item.id);
                    }
                  }}
                  className={[
                    "relative w-full rounded-[1.5rem] border p-5 text-left transition-all duration-300",
                    isActive
                      ? "cursor-pointer border-[#ffdc00]/35 bg-[#ffdc00]/10"
                      : isLocked
                        ? "cursor-not-allowed border-white/6 bg-white/[0.02] text-white/35 opacity-70"
                        : "cursor-pointer border-white/8 bg-white/[0.03] hover:border-white/16 hover:bg-white/[0.05]",
                  ].join(" ")}
                >
                  {isLocked ? (
                    <span className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/20 text-white/45">
                      <LockIcon />
                    </span>
                  ) : null}
                  <div className="flex items-start gap-4">
                    <ProgressIcon active={isActive || isComplete} />
                    <div>
                      <p
                        className={[
                          "font-label text-[11px] font-bold uppercase tracking-[0.24em]",
                          isLocked ? "text-white/25" : "text-white/45",
                        ].join(" ")}
                      >
                        {item.eyebrow}
                      </p>
                      <h2
                        className={[
                          "mt-2 font-display text-xl font-extrabold",
                          isLocked ? "text-white/42" : "text-white",
                        ].join(" ")}
                      >
                        {item.title}
                      </h2>
                      <p className={["mt-2 text-sm leading-[1.5]", isLocked ? "text-white/28" : "text-white/52"].join(" ")}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-8 rounded-[1.6rem] border border-white/8 bg-black/20 p-5">
            <p className="font-label text-[11px] font-bold uppercase tracking-[0.24em] text-white/45">
              Fast Reply
            </p>
            <p className="mt-2 font-display text-3xl font-extrabold text-[#ffdc00]">2 Hours</p>
            <p className="mt-2 text-sm leading-[1.5] text-white/52">
              Most quote requests receive a human follow-up within the same business window.
            </p>
          </div>
          </aside>
        ) : null}

        <div className="glass-panel ambient-shadow rounded-[2rem] border border-white/10 p-6 md:p-8 lg:p-10">
          {submitted ? (
            <div className="flex min-h-[560px] flex-col items-center justify-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#ffdc00] text-[#121417] shadow-[0_20px_50px_rgba(255,220,0,0.26)]">
                <svg className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24">
                  <path d="m5 13 4 4L19 7" />
                </svg>
              </div>
              <p className="mt-8 font-label text-[11px] font-bold uppercase tracking-[0.3em] text-[#ffdc00]">
                Request Sent
              </p>
              <h2 className="mt-4 max-w-lg font-display text-4xl font-extrabold leading-[1] text-white">
                Your premium quote request is on its way to the team.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-[1.5] text-white/58">
                Thanks, {formState.firstName}. We have your move details and contact info. A coordinator will reach out with next steps and a tailored estimate.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-8 flex items-start justify-between gap-6">
                <div>
                  <p className="font-label text-[11px] font-bold uppercase tracking-[0.3em] text-[#ffdc00]">
                    {steps[step - 1].eyebrow}
                  </p>
                  <h2 className="mt-4 max-w-2xl font-display text-3xl font-extrabold leading-[1] text-white md:text-4xl">
                    {steps[step - 1].title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-[1.5] text-white/58">
                    {steps[step - 1].description}
                  </p>
                </div>
                <div className="hidden rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/50 md:block">
                  Step {step} of {steps.length}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-6 md:p-8">
                <div
                  key={step}
                  className="animate-in fade-in slide-in-from-right-4 duration-500"
                >
                  {stepContent[step - 1]}
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  className="inline-flex cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 font-display text-sm font-bold text-white/72 transition-all duration-300 hover:border-white/18 hover:bg-white/[0.07] disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={step === 1}
                  type="button"
                  onClick={() => goToStep(step - 1)}
                >
                  Back
                </button>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  {step < steps.length ? (
                    <button
                      className="cta-sheen inline-flex cursor-pointer items-center justify-center rounded-full px-7 py-3 font-display text-sm font-extrabold uppercase tracking-[0.18em] text-[#121417] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_24px_50px_rgba(255,220,0,0.22)] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-45"
                      disabled={!isStepUnlocked(step + 1)}
                      type="button"
                      onClick={() => goToStep(step + 1)}
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      className="cta-sheen inline-flex cursor-pointer items-center justify-center rounded-full px-7 py-3 font-display text-sm font-extrabold uppercase tracking-[0.18em] text-[#121417] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_24px_50px_rgba(255,220,0,0.22)] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-45"
                      disabled={!canContinueFromStep(3)}
                      type="submit"
                    >
                      Send My Request
                    </button>
                  )}
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
