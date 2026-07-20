import type { Fortune } from "../types";

export default function FortuneCard({ fortune }: { fortune: Fortune }) {
  return (
    <div className="paper-card rounded-md p-6">
      <p className="text-center text-xs tracking-widest text-cinnabar">ใบที่ {fortune.id}</p>
      <h3 className="mt-2 text-center font-[family-name:var(--font-serif-th)] text-lg font-medium text-foreground">
        {fortune.title}
      </h3>

      <p className="mt-4 whitespace-pre-line text-center text-sm leading-loose text-foreground/80">
        {fortune.poem}
      </p>

      <p className="divider my-4 text-center text-xs">* * *</p>

      <p className="text-xs font-medium tracking-wide text-gold">ทำนาย</p>
      <p className="mt-1 text-sm text-foreground/90">{fortune.prediction}</p>

      <p className="mt-3 text-xs text-muted">ไอเทมแก้กรรม: {fortune.item}</p>
    </div>
  );
}
