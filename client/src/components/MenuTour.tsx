"use client";

import { useCallback, useEffect, useState } from "react";

type TourStep = {
  selector: string;
  title: string;
  description: string;
};

const STEPS: TourStep[] = [
  {
    selector: '[data-tour="tour-shake"]',
    title: "เขย่าเซียมซี",
    description: "กดที่นี่เพื่อเขย่าและสุ่มคำทำนายดวงของคุณ",
  },
  {
    selector: '[data-tour="tour-manage"]',
    title: "จัดการคำทำนาย",
    description: "เพิ่ม แก้ไข หรือลบคำทำนายในระบบได้จากเมนูนี้",
  },
];

const STORAGE_KEY = "wu-seemsee:menu-tour-seen";

type Rect = { top: number; left: number; width: number; height: number };

export default function MenuTour() {
  const [stepIndex, setStepIndex] = useState(0);
  const [active, setActive] = useState(false);
  const [rect, setRect] = useState<Rect | null>(null);

  const measure = useCallback(() => {
    const step = STEPS[stepIndex];
    const el = document.querySelector<HTMLElement>(step.selector);
    if (!el) {
      setRect(null);
      return;
    }
    const box = el.getBoundingClientRect();
    setRect({ top: box.top, left: box.left, width: box.width, height: box.height });
  }, [stepIndex]);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const id = requestAnimationFrame(() => setActive(true));
      return () => cancelAnimationFrame(id);
    }
  }, []);

  useEffect(() => {
    if (!active) return;
    const id = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [active, measure]);

  const finish = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "1");
    setActive(false);
    setStepIndex(0);
  }, []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, finish]);

  if (!active || !rect) {
    return (
      <button
        type="button"
        onClick={() => {
          setStepIndex(0);
          setActive(true);
        }}
        className="fixed bottom-5 right-5 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-muted shadow-lg hover:text-cinnabar"
        aria-label="เริ่มทัวร์แนะนำเมนู"
      >
        ?
      </button>
    );
  }

  const step = STEPS[stepIndex];
  const padding = 8;
  const highlightStyle = {
    top: rect.top - padding,
    left: rect.left - padding,
    width: rect.width + padding * 2,
    height: rect.height + padding * 2,
  };
  const tooltipWidth = 256;
  const tooltipTop = rect.top + rect.height + padding + 12;
  const tooltipLeft = Math.max(
    16,
    Math.min(rect.left, (typeof window !== "undefined" ? window.innerWidth : 0) - tooltipWidth - 16),
  );

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="pointer-events-none absolute rounded-lg ring-2 ring-cinnabar transition-all duration-300"
        style={{ ...highlightStyle, boxShadow: "0 0 0 9999px rgba(0,0,0,0.65)" }}
      />
      <div
        className="paper-card fade-in pointer-events-auto absolute rounded-lg p-4 shadow-xl"
        style={{ top: tooltipTop, left: tooltipLeft, width: tooltipWidth }}
      >
        <p className="text-sm font-semibold text-foreground">{step.title}</p>
        <p className="mt-1 text-sm text-muted">{step.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex gap-1">
            {STEPS.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full ${i === stepIndex ? "bg-cinnabar" : "bg-border"}`}
              />
            ))}
          </div>
          <div className="flex gap-3 text-sm">
            <button type="button" onClick={finish} className="text-muted hover:text-foreground">
              ข้าม
            </button>
            <button
              type="button"
              onClick={() => {
                if (stepIndex < STEPS.length - 1) {
                  setStepIndex((i) => i + 1);
                } else {
                  finish();
                }
              }}
              className="font-medium text-cinnabar hover:underline"
            >
              {stepIndex < STEPS.length - 1 ? "ถัดไป" : "เสร็จสิ้น"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
