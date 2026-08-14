import { Fragment } from "react";

type Quest = {
  no: string;
  title: string;
  file: string;
  goal: string;
  key: string;
  check: string;
};

const FLOW = [
  { label: "Browser", detail: "น้องกดปุ่มบนหน้าเว็บ" },
  { label: "Next.js", detail: "หน้าเว็บเรียก api.ts (axios)" },
  { label: "Express", detail: "routes.ts รับ request แล้วส่งต่อ" },
  { label: "lowdb", detail: "data.ts อ่าน/เขียน db.json" },
];

const CLIENT_QUESTS: Quest[] = [
  {
    no: "1",
    title: "ดึงคำทำนายทั้งหมด",
    file: "features/fortunes/api.ts",
    goal: "GET /api/fortunes → return Fortune[]",
    key: "ข้อมูลจริงอยู่ใน res.data เสมอ ไม่ใช่ res",
    check: "หน้า /fortunes ขึ้นการ์ดครบทุกใบ",
  },
  {
    no: "2",
    title: "สุ่มคำทำนาย 1 ใบ",
    file: "features/fortunes/api.ts",
    goal: "GET /api/fortunes/random → return Fortune ใบเดียว",
    key: "path คือ /random ไม่ใช่ /:id พิมพ์ผิดได้ 404",
    check: "กดเขย่าหน้าแรกแล้วได้ใบเซียมซี",
  },
  {
    no: "3",
    title: "ดึงคำทำนายตาม id",
    file: "features/fortunes/api.ts",
    goal: "GET /api/fortunes/:id → return Fortune",
    key: "ต่อ id ด้วย template string `/api/fortunes/${id}`",
    check: "กดการ์ดแล้วเข้าหน้ารายละเอียดได้ (ต้องผ่าน QUEST 10 ก่อน)",
  },
  {
    no: "4",
    title: "สร้างคำทำนายใหม่",
    file: "features/fortunes/api.ts",
    goal: "POST /api/fortunes พร้อม body → return ใบที่สร้าง",
    key: "axios.post รับ 2 ตัว: (path, body) — id server แจกให้เอง",
    check: "กด + เพิ่มคำทำนาย กรอกครบ แล้วบันทึกผ่าน",
  },
  {
    no: "5",
    title: "แก้ไขคำทำนาย",
    file: "features/fortunes/api.ts",
    goal: "PUT /api/fortunes/:id → return ใบที่แก้แล้ว",
    key: "เหมือนข้อ 4 แต่เปลี่ยน .post เป็น .put และต่อ id ใน path",
    check: "แก้ชื่อใบเซียมซีแล้วหน้ารายละเอียดเปลี่ยนตาม",
  },
  {
    no: "6",
    title: "ลบคำทำนาย",
    file: "features/fortunes/api.ts",
    goal: "DELETE /api/fortunes/:id → return void",
    key: "ไม่ต้อง return อะไร แค่ await ให้จบ",
    check: "กดลบแล้วการ์ดหายจากหน้า list",
  },
  {
    no: "7",
    title: 'ปุ่ม "เพิ่มคำทำนาย"',
    file: "app/fortunes/page.tsx",
    goal: "ใส่ <Link href=\"/fortunes/new\"> ให้หน้าตาเป็นปุ่ม",
    key: "ใช้ <Link> ของ next/link ไม่ใช่ <a> — navigate โดยไม่ reload ทั้งหน้า",
    check: "กดปุ่มแล้วไปหน้าฟอร์มโดยหน้าไม่กระพริบ",
  },
  {
    no: "8",
    title: 'ช่อง "ไอเทมแก้กรรม"',
    file: "features/fortunes/components/FortuneForm.tsx",
    goal: "เพิ่ม <label> + <input> ผูกกับ state item / setItem",
    key: "controlled component: input ต้องมีทั้ง value และ onChange ไม่งั้นพิมพ์ไม่ได้",
    check: 'หน้ารายละเอียดขึ้น "ไอเทมแก้กรรม: ..." ตามที่พิมพ์',
  },
  {
    no: "9",
    title: "ต่อสายฟอร์มเข้า handleSubmit",
    file: "features/fortunes/components/FortuneForm.tsx",
    goal: "ใส่ prop onSubmit={handleSubmit} ให้ <form>",
    key: "default ของ HTML form คือ reload ทิ้ง — e.preventDefault() กันไว้ใน handleSubmit แล้ว",
    check: "กดบันทึกแล้วหน้าไม่ reload แต่เด้งไปหน้ารายละเอียด",
  },
];

const SERVER_QUESTS: Quest[] = [
  {
    no: "10",
    title: "ดึงคำทำนาย 1 ใบจาก id (ฝั่ง server)",
    file: "server/data.ts",
    goal: "await db.read() แล้ว db.data.fortunes.find((f) => f.id === id)",
    key: ".find() คืน undefined เองถ้าไม่เจอ → route ตอบ 404 ให้อัตโนมัติ",
    check: "/api/fortunes/1 ได้ JSON, /api/fortunes/999 ได้ 404",
  },
];

const CONCEPTS = [
  {
    title: "res.data ของ axios",
    detail:
      "axios ห่อ response ไว้เป็น object ใหญ่ (status, headers, data) ข้อมูลที่เราอยากได้อยู่ใน .data เสมอ ลืมข้อนี้ = undefined ทุกที",
  },
  {
    title: "ลำดับ route สำคัญ",
    detail:
      '/random ต้องประกาศก่อน /:id ใน routes.ts ไม่งั้น express อ่านคำว่า "random" เป็น id แล้วพัง',
  },
  {
    title: "Controlled component",
    detail:
      "React เป็นเจ้าของค่าใน input: value มาจาก state, onChange อัปเดต state ใส่แค่ value อย่างเดียวจะพิมพ์ไม่ได้",
  },
  {
    title: "Omit / Partial",
    detail:
      "FortuneInput = Omit<Fortune, \"id\"> เพราะตอนสร้าง server แจก id ให้ ส่วน update ใช้ Partial = ส่งเฉพาะ field ที่จะแก้",
  },
  {
    title: "Server Component เรียก API ตรง ๆ",
    detail:
      "หน้า list กับหน้ารายละเอียดเป็น async component — await ข้อมูลก่อน render ได้เลย ไม่ต้อง useEffect",
  },
  {
    title: "status code ที่ต้องรู้",
    detail:
      "200 สำเร็จ, 201 สร้างใหม่สำเร็จ, 204 ลบแล้วไม่มี body, 400 ส่งข้อมูลไม่ครบ, 404 หาไม่เจอ",
  },
];

const ORDER = [
  "รัน server (localhost:4000) และ client (localhost:3000) ให้ขึ้นทั้งคู่ก่อน",
  "ทำ QUEST 1 → เห็นการ์ดขึ้นหน้า /fortunes = สะพาน client-server ติดแล้ว",
  "ทำ QUEST 2 → เขย่าหน้าแรกได้",
  "ทำ QUEST 10 (ฝั่ง server) ก่อน QUEST 3 ไม่งั้นหน้ารายละเอียด 404 ตลอด",
  "ทำ QUEST 4-6 ให้ CRUD ครบวง",
  "ทำ QUEST 7-9 ปิดงานฝั่ง UI",
  "BONUS: path \"/api/fortunes\" ซ้ำหลายที่ ลองแยกเป็น const เดียวใน api.ts",
];

function QuestCard({ quest }: { quest: Quest }) {
  return (
    <div className="paper-card relative overflow-hidden rounded-lg border-l-2 border-l-cinnabar p-4 shadow-sm transition-shadow hover:shadow-md">
      <span className="absolute right-3 top-2 font-[family-name:var(--font-serif-th)] text-4xl leading-none text-cinnabar/10">
        {quest.no.padStart(2, "0")}
      </span>
      <h3 className="relative font-medium text-cinnabar">
        QUEST {quest.no} — {quest.title}
      </h3>
      <p className="relative mt-1 font-mono text-xs text-muted">{quest.file}</p>
      <dl className="relative mt-3 flex flex-col gap-2 text-sm">
        <div className="flex gap-2">
          <dt className="shrink-0 text-xs font-medium text-gold">ทำอะไร</dt>
          <dd className="text-foreground">{quest.goal}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="shrink-0 text-xs font-medium text-gold">จุดพลาด</dt>
          <dd className="text-muted">{quest.key}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="shrink-0 text-xs font-medium text-gold">เช็กผ่าน</dt>
          <dd className="text-muted">{quest.check}</dd>
        </div>
      </dl>
    </div>
  );
}

export default function QuizePage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-12 px-5 py-12">
      <div className="fade-in flex flex-col items-center gap-3 text-center">
        <span className="rounded-full border border-cinnabar/30 bg-cinnabar/5 px-3 py-1 text-xs font-medium tracking-wide text-cinnabar">
          สรุปเควส
        </span>
        <h1 className="font-[family-name:var(--font-serif-th)] text-4xl text-foreground">
          เควสทั้งหมดของ W-มู
        </h1>
        <p className="max-w-md text-sm text-muted">
          10 เควส + 1 โบนัส ที่ซ่อนอยู่ในโค้ด สรุปไว้ที่เดียวว่าแต่ละข้อทำอะไร
          อยู่ไฟล์ไหน และเช็กยังไงว่าผ่านแล้ว
        </p>
        <span className="divider text-xs">· · ·</span>
      </div>

      <section className="fade-in flex flex-col gap-4">
        <h2 className="font-[family-name:var(--font-serif-th)] text-xl text-foreground">
          ข้อมูลวิ่งยังไง
        </h2>
        <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
          {FLOW.map((step, i) => (
            <Fragment key={step.label}>
              <div className="paper-card flex h-full flex-col items-center gap-2 rounded-xl p-4 text-center shadow-sm">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/10 text-sm font-semibold text-gold">
                  {i + 1}
                </span>
                <span className="font-medium text-foreground">{step.label}</span>
                <span className="text-xs leading-snug text-muted">{step.detail}</span>
              </div>
              {i < FLOW.length - 1 && (
                <span aria-hidden className="flex items-center justify-center text-xl text-gold">
                  <span className="sm:hidden">↓</span>
                  <span className="hidden sm:inline">→</span>
                </span>
              )}
            </Fragment>
          ))}
        </div>
        <p className="text-sm text-muted">
          เควสฝั่ง client คือทำให้ลูกศรจาก Next.js ไป Express ติด ส่วนเควสฝั่ง server
          คือทำให้ Express อ่าน lowdb ได้ครบ
        </p>
      </section>

      <section className="fade-in flex flex-col gap-4">
        <h2 className="font-[family-name:var(--font-serif-th)] text-xl text-foreground">
          เควสฝั่ง Client{" "}
          <span className="text-sm font-normal text-muted">(QUEST 1-9)</span>
        </h2>
        <div className="flex flex-col gap-3">
          {CLIENT_QUESTS.map((quest) => (
            <QuestCard key={quest.no} quest={quest} />
          ))}
        </div>
      </section>

      <section className="fade-in flex flex-col gap-4">
        <h2 className="font-[family-name:var(--font-serif-th)] text-xl text-foreground">
          เควสฝั่ง Server{" "}
          <span className="text-sm font-normal text-muted">(QUEST 10)</span>
        </h2>
        <div className="flex flex-col gap-3">
          {SERVER_QUESTS.map((quest) => (
            <QuestCard key={quest.no} quest={quest} />
          ))}
        </div>
      </section>

      <section className="fade-in flex flex-col gap-4">
        <h2 className="font-[family-name:var(--font-serif-th)] text-xl text-foreground">
          ลำดับที่แนะนำ
        </h2>
        <ol className="paper-card flex flex-col gap-3 rounded-lg p-5">
          {ORDER.map((step, i) => (
            <li key={step} className="flex gap-3 text-sm">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cinnabar/10 text-xs font-semibold text-cinnabar">
                {i + 1}
              </span>
              <span className="text-muted">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="fade-in flex flex-col gap-4">
        <h2 className="font-[family-name:var(--font-serif-th)] text-xl text-foreground">
          คอนเซ็ปต์ที่ได้จากเควสพวกนี้
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {CONCEPTS.map((concept) => (
            <div key={concept.title} className="paper-card rounded-lg p-4 shadow-sm">
              <h3 className="font-medium text-cinnabar">{concept.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{concept.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="fade-in flex flex-col gap-3">
        <h2 className="font-[family-name:var(--font-serif-th)] text-xl text-foreground">
          ติดตรงไหน เปิดที่นี่
        </h2>
        <div className="paper-card flex flex-col gap-2 rounded-lg p-5 text-sm text-muted">
          <p>
            <span className="font-medium text-foreground">endpoint ทั้งหมด</span> —{" "}
            <code className="font-mono text-xs text-cinnabar">server/README.md</code>
          </p>
          <p>
            <span className="font-medium text-foreground">ยิง API ทดสอบ</span> — โฟลเดอร์{" "}
            <code className="font-mono text-xs text-cinnabar">bruno/</code> หรือเปิด{" "}
            <code className="font-mono text-xs text-cinnabar">http://localhost:4000/api/fortunes</code>{" "}
            ใน browser ตรง ๆ
          </p>
          <p>
            <span className="font-medium text-foreground">สีกับฟอนต์ของธีม</span> —{" "}
            <code className="font-mono text-xs text-cinnabar">src/app/globals.css</code>
          </p>
          <p>
            <span className="font-medium text-foreground">ทำทีละข้อ</span> —
            เขียนเสร็จ 1 ข้อ เปิดหน้าเว็บดูผลทุกครั้ง อย่าเขียนรวดเดียว 6 ข้อแล้วค่อยรัน
          </p>
        </div>
      </section>
    </div>
  );
}
