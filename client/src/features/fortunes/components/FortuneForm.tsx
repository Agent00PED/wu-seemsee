"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createFortune, updateFortune } from "../api";
import type { Fortune } from "../types";

type Props = { mode: "create" } | { mode: "edit"; id: number; initialValues: Fortune };

export default function FortuneForm(props: Props) {
  const router = useRouter();
  const initial = props.mode === "edit" ? props.initialValues : undefined;

  const [title, setTitle] = useState(initial?.title ?? "");
  const [poem, setPoem] = useState(initial?.poem ?? "");
  const [prediction, setPrediction] = useState(initial?.prediction ?? "");
  const [item, setItem] = useState(initial?.item ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      if (props.mode === "create") {
        const created = await createFortune({ title, poem, prediction, item, image: null });
        router.push(`/fortunes/${created.id}`);
      } else {
        await updateFortune(props.id, { title, poem, prediction, item });
        router.push(`/fortunes/${props.id}`);
      }
      router.refresh();
    } catch {
      setError("บันทึกไม่สำเร็จ ลองใหม่อีกครั้ง");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "paper-card rounded-md px-4 py-2 text-foreground outline-none placeholder:text-muted focus:border-cinnabar";

  /*
    QUEST 9 — ต่อสายฟอร์มเข้ากับ handleSubmit

      ตอนนี้ <form> ยังไม่รู้จัก handleSubmit เลย กดปุ่มบันทึกแล้วหน้าจะ
      reload ทิ้ง (พฤติกรรม default ของ HTML form) ข้อมูลหายหมด

      ภารกิจ: ใส่ prop `onSubmit` ให้ <form> ข้างล่าง ชี้ไปที่ handleSubmit
  */

  return (
    <form className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm text-muted">
        ชื่อใบเซียมซี
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-muted">
        กลอนคำทำนาย
        <textarea
          value={poem}
          onChange={(e) => setPoem(e.target.value)}
          required
          rows={4}
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-muted">
        ทำนายมวลรวม
        <input
          value={prediction}
          onChange={(e) => setPrediction(e.target.value)}
          required
          className={inputClass}
        />
      </label>

      {/*
        QUEST 8 — ช่อง "ไอเทมแก้กรรม"

        ตอนนี้ฟอร์มขาดช่องนี้ไป 1 ช่อง สร้างคำทำนายแล้ว item จะว่างตลอด
        ภารกิจ: เพิ่ม <label> + <input> ตรงนี้

        ของที่เตรียมไว้ให้แล้ว (ไม่ต้องสร้างใหม่):
          - state: `item` กับ `setItem` (บรรทัดบน ๆ ของไฟล์)
          - `inputClass` = class ของ input ทุกช่องในฟอร์มนี้
          - handleSubmit ส่ง `item` ไป API ให้แล้ว

        ขั้นตอน: ลอกโครงจากช่อง "ทำนายมวลรวม" ข้างบน แล้วเปลี่ยน
          1. ข้อความ label เป็น "ไอเทมแก้กรรม"
          2. value={...}    -> ผูกกับ state `item`
          3. onChange={...} -> เรียก setItem(e.target.value)
          4. คง required และ className={inputClass} ไว้

        ทำไม input ต้องมีทั้ง value และ onChange?
          นี่คือ controlled component — React เป็นเจ้าของค่าใน input
          ถ้าใส่ value อย่างเดียวไม่ใส่ onChange = พิมพ์ไม่ได้เลย ลองดูได้

        เช็กว่าผ่าน: กรอกฟอร์มครบ กดบันทึก แล้วหน้ารายละเอียดต้องขึ้น
        "ไอเทมแก้กรรม: ..." ตามที่พิมพ์ (ไม่ใช่ค่าว่าง)
      */}

      {error && <p className="text-sm text-cinnabar">{error}</p>}

      <button
        type="submit"
        disabled={saving}
        className="rounded-md border border-cinnabar py-2 text-sm text-cinnabar hover:bg-cinnabar hover:text-surface disabled:opacity-50"
      >
        {saving ? "กำลังบันทึก..." : props.mode === "create" ? "สร้างใบเซียมซี" : "บันทึกการแก้ไข"}
      </button>
    </form>
  );
}
