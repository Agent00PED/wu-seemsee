import { Fragment } from "react";

const FEATURES = [
  {
    title: "เขย่าเซียมซีสุ่มดวง",
    description: "สุ่มคำทำนายทีเดียว พังหรือปังกันทั้งคณะ พร้อมอนิเมชันเขย่ากระบอก",
  },
  {
    title: "จัดการคำทำนาย (CRUD เต็มรูปแบบ)",
    description: "เพิ่ม แก้ไข ลบ และดูคำทำนายทั้งหมดได้จากหน้าเดียว ผ่าน REST API",
  },
  {
    title: "ทัวร์แนะนำเมนูอัตโนมัติ",
    description: "ผู้ใช้ใหม่เห็นไกด์ชี้เมนูสำคัญทันทีที่เข้าเว็บครั้งแรก จำสถานะด้วย localStorage",
  },
  {
    title: "ธีมกระดาษเซียมซี",
    description: "ดีไซน์โทนสีแดงชาด-ทอง ฟอนต์ไทยเฉพาะ อ่านง่าย ให้ความรู้สึกศาลเจ้าจริง",
  },
];

const LAYERS = [
  {
    label: "Web",
    detail: "ผู้ใช้เข้าเว็บผ่านเบราว์เซอร์ รองรับมือถือและเดสก์ท็อป",
  },
  {
    label: "Frontend",
    detail: "Next.js (App Router) + React + Tailwind — เรียก REST API ด้วย fetch",
  },
  {
    label: "Backend",
    detail: "Express REST API เขียนด้วย TypeScript รันด้วย tsx",
  },
  {
    label: "Database",
    detail: "lowdb เก็บข้อมูลเป็นไฟล์ JSON (db.json)",
  },
];

export default function AboutSystemPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-12 px-5 py-12">
      <div className="fade-in flex flex-col items-center gap-3 text-center">
        <span className="rounded-full border border-cinnabar/30 bg-cinnabar/5 px-3 py-1 text-xs font-medium tracking-wide text-cinnabar">
          ระบบของเรา
        </span>
        <h1 className="font-[family-name:var(--font-serif-th)] text-4xl text-foreground">
          รู้จัก W-มู
        </h1>
        <p className="max-w-md text-sm text-muted">
          เว็บเซียมซีมวลชน สร้างเพื่อสอนน้อง Web Camp ตั้งแต่หน้าบ้านถึงหลังบ้าน
        </p>
        <span className="divider text-xs">· · ·</span>
      </div>

      <section className="fade-in flex flex-col gap-4">
        <h2 className="font-[family-name:var(--font-serif-th)] text-xl text-foreground">
          Highlight Features
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              className="paper-card group relative overflow-hidden rounded-lg border-l-2 border-l-cinnabar p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="font-[family-name:var(--font-serif-th)] text-3xl text-cinnabar/10 absolute right-3 top-2 leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="relative font-medium text-cinnabar">{feature.title}</h3>
              <p className="relative mt-1 text-sm text-muted">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="fade-in flex flex-col gap-4">
        <h2 className="font-[family-name:var(--font-serif-th)] text-xl text-foreground">
          Architecture
        </h2>
        <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
          {LAYERS.map((layer, i) => (
            <Fragment key={layer.label}>
              <div className="paper-card flex h-full flex-col items-center gap-2 rounded-xl p-4 text-center shadow-sm transition-shadow hover:shadow-md">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/10 text-sm font-semibold text-gold">
                  {layer.label[0]}
                </span>
                <span className="font-medium text-foreground">{layer.label}</span>
                <span className="text-xs leading-snug text-muted">{layer.detail}</span>
              </div>
              {i < LAYERS.length - 1 && (
                <span aria-hidden className="flex items-center justify-center text-xl text-gold">
                  <span className="sm:hidden">↓</span>
                  <span className="hidden sm:inline">→</span>
                </span>
              )}
            </Fragment>
          ))}
        </div>
      </section>
    </div>
  );
}
