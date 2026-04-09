import Image from "next/image";

function StarRow() {
  return (
    <div className="flex items-center gap-0.5 text-[#0d5c55]">
      {[0, 1, 2, 3, 4].map((star) => (
        <svg
          key={star}
          className="h-6 w-6 md:h-7 md:w-7"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="m12 2.8 2.83 5.73 6.32.92-4.57 4.45 1.08 6.29L12 17.19l-5.66 2.98 1.08-6.29-4.57-4.45 6.32-.92L12 2.8Z" />
        </svg>
      ))}
    </div>
  );
}

export default function TrustBanner() {
  return (
    <section className="border-y border-black/6 bg-[#f8f6ef] text-[#143d39]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-7 sm:px-6 md:px-8 lg:grid-cols-4 lg:gap-10 lg:py-8">
        <div className="flex items-center justify-center text-center">
          <p className="max-w-[16rem] font-display text-2xl font-extrabold leading-[1.08] tracking-tight">
            Minnesota&apos;s Most
            <br />
            Trusted Local Movers
          </p>
        </div>

        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="font-poppins text-3xl font-black leading-none sm:text-[40px]">5.0</span>
            <StarRow />
          </div>
          <p className="mt-2 text-sm font-semibold text-[#143d39]/78">
            More than 2,500 reviews on Google
          </p>
        </div>

        <div className="flex flex-col items-center justify-center text-center">
          <Image
            src="/brand/forbes-logo.png"
            alt="Forbes"
            width={2400}
            height={628}
            className="h-11 w-auto"
          />
          <p className="mt-2 text-sm font-semibold text-[#143d39]/78">
            Rates Us #1 in Moving Services
          </p>
        </div>

        <div className="flex flex-col items-center justify-center text-center">
          <Image
            src="/brand/usa-today-logo.png"
            alt="USA Today"
            width={3840}
            height={575}
            className="h-9 w-auto"
          />
          <p className="mt-2 text-sm font-semibold text-[#143d39]/78">
            5/5 Star Rating
          </p>
        </div>
      </div>
    </section>
  );
}
