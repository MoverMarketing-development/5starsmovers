export default function Loading() {
  return (
    <main className="min-h-screen bg-[#121417] px-4 py-16 text-white md:px-8">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="h-14 w-52 rounded-full bg-white/8" />
        <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="h-[720px] rounded-[2rem] bg-white/[0.05]" />
          <div className="h-[720px] rounded-[2rem] bg-white/[0.05]" />
        </div>
      </div>
    </main>
  );
}
