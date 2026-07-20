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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

      <label className="flex flex-col gap-1 text-sm text-muted">
        ไอเทมแก้กรรม
        <input
          value={item}
          onChange={(e) => setItem(e.target.value)}
          required
          className={inputClass}
        />
      </label>

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
