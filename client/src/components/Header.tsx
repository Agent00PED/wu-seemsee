import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-surface/85 px-5 py-4 backdrop-blur-md">
      <Link
        href="/"
        className="font-[family-name:var(--font-serif-th)] text-lg font-semibold text-cinnabar"
      >
        W-มู
      </Link>
      <nav className="flex items-center gap-5 text-sm text-muted">
        <Link
          href="/"
          data-tour="tour-shake"
          className="hover:text-foreground hover:underline"
        >
          เขย่าเซียมซี
        </Link>
        <Link
          href="/fortunes"
          data-tour="tour-manage"
          className="hover:text-foreground hover:underline"
        >
          จัดการคำทำนาย
        </Link>
        <Link href="/about" className="hover:text-foreground hover:underline">
          รู้จักระบบ
        </Link>
      </nav>
    </header>
  );
}
