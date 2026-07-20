import ShakeSection from "@/features/fortunes/components/ShakeSection";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-10 px-5 py-16">
      <div className="fade-in flex flex-col items-center gap-3 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-cinnabar text-cinnabar">
          印
        </div>
        <h1 className="font-[family-name:var(--font-serif-th)] text-4xl font-semibold text-foreground">
          W-มู
        </h1>
        <p className="text-sm text-muted">สุ่มดวงทีเดียว พัง/ปัง กันทั้งคณะ</p>
      </div>

      <div className="fade-in [animation-delay:0.1s]">
        <ShakeSection />
      </div>
    </main>
  );
}
