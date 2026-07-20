"use client";

import { useState } from "react";
import Image from "next/image";
import { useShake } from "../hooks/useShake";
import { getRandomFortune } from "../api";
import type { Fortune } from "../types";
import FortuneCard from "./FortuneCard";
import Modal from "@/components/Modal";

const SHAKE_ANIMATION_MS = 600;

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
    <div className="paper-card flex flex-col items-center gap-6 rounded-md p-8">
      <button
        onClick={handleCylinderClick}
        disabled={loading}
        aria-label="เขย่าเซียมซี"
        className={`transition-transform hover:scale-105 disabled:opacity-50 ${
          isShaking ? "animate-shake" : ""
        }`}
      >
        <Image
          src="/seamsi-logo.svg"
          alt="กระบอกเซียมซี"
          width={140}
          height={317}
          priority
        />
      </button>

      <p className="text-center text-sm text-muted">
        {isShaking
          ? "กำลังเขย่า..."
          : loading
            ? "กำลังทำนาย..."
            : permission === "granted"
              ? "เขย่ามือถือ หรือกดที่กระบอกเซียมซี"
              : "กดที่กระบอกเซียมซีเพื่อเริ่ม 🙏"}
      </p>

      {permission === "denied" && (
        <p className="text-sm text-cinnabar">ไม่อนุญาตให้ใช้เซนเซอร์เขย่า กดที่กระบอกแทนได้</p>
      )}

      {error && <p className="text-sm text-cinnabar">{error}</p>}

      {result && (
        <Modal onClose={() => setResult(null)}>
          <FortuneCard fortune={result} />
          <button
            onClick={() => setResult(null)}
            className="mt-4 w-full rounded-md border border-border py-2 text-sm text-muted hover:bg-background"
          >
            เขย่าใหม่
          </button>
        </Modal>
      )}
    </div>
  );
}
