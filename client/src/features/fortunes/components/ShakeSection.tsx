"use client";

import { useState } from "react";
import Image from "next/image";
import { useShake } from "../hooks/useShake";
import { getRandomFortune } from "../api";
import type { Fortune } from "../types";
import FortuneCard from "./FortuneCard";
import Modal from "@/components/Modal";

const SHAKE_ANIMATION_MS = 1000;

export default function ShakeSection() {
  const [result, setResult] = useState<Fortune | null>(null);
  const [loading, setLoading] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const drawFortune = () => {
    setLoading(true);
    setError(null);
    getRandomFortune()
      .then(setResult)
      .catch(() => setError("เชื่อมต่อ backend ไม่ได้ ตรวจสอบว่ารัน server อยู่หรือเปล่า"))
      .finally(() => setLoading(false));
  };

  // เล่นอนิเมชันกระบอกเซียมซีสั่นก่อน แล้วค่อยสุ่มผล
  const playShakeAnimation = () => {
    if (isShaking || loading) return;
    setIsShaking(true);
    window.setTimeout(() => {
      setIsShaking(false);
      drawFortune();
    }, SHAKE_ANIMATION_MS);
  };

  const { permission, requestPermission } = useShake(playShakeAnimation);

  // คลิกที่กระบอกเซียมซีบนเว็บ = เขย่าเอง ใช้ได้ทั้งคอมและมือถือ ไม่ต้องพึ่งเซนเซอร์
  const handleCylinderClick = async () => {
    if (permission === "idle" || permission === "unsupported") {
      await requestPermission();
    }
    playShakeAnimation();
  };

  return (
    <div className="paper-card relative flex flex-col items-center gap-6 overflow-hidden rounded-2xl p-8 sm:p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute top-6 h-40 w-40 rounded-full bg-gold/10 blur-2xl"
      />

      <button
        onClick={handleCylinderClick}
        disabled={loading}
        aria-label="เขย่าเซียมซี"
        className={`relative transition-transform duration-300 hover:scale-105 hover:drop-shadow-[0_8px_16px_rgba(194,58,42,0.25)] disabled:opacity-50 ${
          isShaking ? "animate-shake" : ""
        }`}
      >
        <Image
          src="/seamsi-logo.svg"
          alt="กระบอกเซียมซี"
          width={120}
          height={300}
          priority
        />
      </button>

      <p className="relative text-center text-sm font-medium text-muted">
        {isShaking
          ? "กำลังเขย่า..."
          : loading
            ? "กำลังทำนาย..."
            : permission === "granted"
              ? "เขย่ามือถือ หรือกดที่กระบอกเซียมซี"
              : "กดที่กระบอกเซียมซีเพื่อเริ่ม 🙏"}
      </p>

      {permission === "denied" && (
        <p className="relative text-sm text-cinnabar">ไม่อนุญาตให้ใช้เซนเซอร์เขย่า กดที่กระบอกแทนได้</p>
      )}

      {error && <p className="relative text-sm text-cinnabar">{error}</p>}

      {result && (
        <Modal onClose={() => setResult(null)}>
          <FortuneCard fortune={result} />
          <button
            onClick={() => setResult(null)}
            className="mt-4 w-full rounded-md border border-border py-2 text-sm text-muted transition-colors hover:border-cinnabar hover:bg-background hover:text-cinnabar"
          >
            เขย่าใหม่
          </button>
        </Modal>
      )}
    </div>
  );
}
