"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type PermissionState = "idle" | "granted" | "denied" | "unsupported";

interface DeviceMotionEventWithPermission {
  requestPermission?: () => Promise<"granted" | "denied">;
}

const SHAKE_THRESHOLD = 15; // ความเปลี่ยนแปลงความเร่ง (m/s^2) ที่ถือว่าเป็นการเขย่า
const SHAKE_COOLDOWN_MS = 1000;

export function useShake(onShake: () => void) {
  const [permission, setPermission] = useState<PermissionState>("idle");
  const lastAcceleration = useRef({ x: 0, y: 0, z: 0 });
  const lastShakeTime = useRef(0);

  const handleMotion = useCallback(
    (event: DeviceMotionEvent) => {
      const acc = event.accelerationIncludingGravity;
      if (!acc || acc.x == null || acc.y == null || acc.z == null) return;

      const delta =
        Math.abs(acc.x - lastAcceleration.current.x) +
        Math.abs(acc.y - lastAcceleration.current.y) +
        Math.abs(acc.z - lastAcceleration.current.z);

      lastAcceleration.current = { x: acc.x, y: acc.y, z: acc.z };

      const now = Date.now();
      if (delta > SHAKE_THRESHOLD && now - lastShakeTime.current > SHAKE_COOLDOWN_MS) {
        lastShakeTime.current = now;
        onShake();
      }
    },
    [onShake],
  );

  const requestPermission = useCallback(async () => {
    if (typeof window === "undefined" || typeof window.DeviceMotionEvent === "undefined") {
      setPermission("unsupported");
      return false;
    }

    // iOS Safari 13+ ต้องขอ permission จาก user gesture ก่อนถึงจะฟัง devicemotion ได้
    const DeviceMotionEventTyped = window.DeviceMotionEvent as unknown as typeof DeviceMotionEvent &
      DeviceMotionEventWithPermission;

    if (typeof DeviceMotionEventTyped.requestPermission === "function") {
      try {
        const result = await DeviceMotionEventTyped.requestPermission();
        setPermission(result === "granted" ? "granted" : "denied");
        return result === "granted";
      } catch {
        setPermission("denied");
        return false;
      }
    }

    // Android / desktop ส่วนใหญ่ไม่ต้องขอ permission
    setPermission("granted");
    return true;
  }, []);

  useEffect(() => {
    if (permission !== "granted") return;
    window.addEventListener("devicemotion", handleMotion);
    return () => window.removeEventListener("devicemotion", handleMotion);
  }, [permission, handleMotion]);

  return { permission, requestPermission };
}
