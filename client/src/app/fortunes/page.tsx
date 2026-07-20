import Link from "next/link";
import { getAllFortunes } from "@/features/fortunes/api";

export default async function FortunesPage() {
  const fortunes = await getAllFortunes().catch(() => null);

  if (fortunes === null) {
    return (
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-4 px-5 py-10">
        <h1 className="font-[family-name:var(--font-serif-th)] text-2xl text-foreground">
          คำทำนายทั้งหมด
        </h1>
        <p className="text-sm text-cinnabar">
          เชื่อมต่อ backend ไม่ได้ ตรวจสอบว่ารัน server (localhost:4000) อยู่หรือเปล่า
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-5 py-10">
      <div className="flex items-center justify-between">
        <h1 className="font-[family-name:var(--font-serif-th)] text-2xl text-foreground">
          คำทำนายทั้งหมด
        </h1>
        <Link
          href="/fortunes/new"
          className="rounded-md border border-cinnabar px-4 py-2 text-sm text-cinnabar hover:bg-cinnabar hover:text-surface"
        >
          + สร้างใหม่
        </Link>
      </div>

      {fortunes.length === 0 ? (
        <p className="text-sm text-muted">ยังไม่มีคำทำนายในระบบ</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fortunes.map((fortune) => (
            <Link
              key={fortune.id}
              href={`/fortunes/${fortune.id}`}
              className="paper-card flex flex-col rounded-md p-5 transition-colors hover:bg-background"
            >
              <p className="text-center text-xs tracking-widest text-cinnabar">
                ใบที่ {fortune.id}
              </p>
              <h3 className="mt-2 text-center font-[family-name:var(--font-serif-th)] text-lg font-medium text-foreground">
                {fortune.title}
              </h3>

              <p className="mt-3 line-clamp-3 whitespace-pre-line text-center text-sm leading-loose text-foreground/80">
                {fortune.poem}
              </p>

              <p className="divider my-4 text-center text-xs">* * *</p>

              <p className="text-xs font-medium tracking-wide text-gold">ทำนาย</p>
              <p className="mt-1 line-clamp-2 text-sm text-foreground/90">{fortune.prediction}</p>

              <p className="mt-3 line-clamp-1 text-xs text-muted">ไอเทมแก้กรรม: {fortune.item}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
