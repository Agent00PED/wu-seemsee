import ShakeSection from "@/features/fortunes/components/ShakeSection";

export default function Home() {
  return (
    <main className="relative mx-auto flex w-full max-w-md flex-1 flex-col items-center gap-12 overflow-hidden px-5 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cinnabar/10 blur-3xl"
      />

      <div className="fade-in relative flex flex-col items-center gap-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-cinnabar bg-cinnabar/5 text-2xl text-cinnabar shadow-sm">
          印
        </div>
        <div className="flex flex-col items-center gap-2">
          <h1 className="font-[family-name:var(--font-serif-th)] text-5xl font-semibold tracking-tight text-foreground">
            W-มู
          </h1>
          <p className="divider text-xs">・ ・ ・</p>
          <p className="max-w-[22ch] text-sm text-muted">
            เขย่าทีเดียว ปังหรือพังให้ทั้งแก๊งรู้กัน 🔮
          </p>
        </div>
      </div>

      <div className="fade-in relative w-full [animation-delay:0.1s]">
        <ShakeSection />
      </div>
    </main>
  );
}
