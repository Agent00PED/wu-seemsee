import { apiClient } from "@/lib/apiClient";
import type { Fortune } from "./types";

/**
 * ========================================
 *  QUEST: เชื่อม API เซียมซี 🥠
 * ========================================
 *
 * ไฟล์นี้คือ "สะพาน" ระหว่างหน้าเว็บ (React) กับ server (Express)
 * ตอนนี้ทุกฟังก์ชันยังว่างอยู่ ภารกิจของน้องคือเติมโค้ดให้ครบ!
 *
 * เครื่องมือที่ใช้: `apiClient` (axios instance ที่ตั้ง baseURL ไว้แล้ว)
 *   baseURL มาจาก env `NEXT_PUBLIC_API_URL` เช่น http://localhost:4000
 *   -> เวลาเรียกจึงใส่แค่ path ต่อท้าย เช่น apiClient.get("/api/fortunes")
 *
 * ท่าพื้นฐานของ axios:
 *   const res = await apiClient.get("/api/fortunes");
 *   res.data // <-- ข้อมูลจริงอยู่ใน .data เสมอ (อย่าลืม!)
 *
 * เช็ก endpoint ทั้งหมดได้ที่ server/README.md
 * ทดสอบยิง API ได้จากโฟลเดอร์ bruno/ หรือเปิด browser ตรง ๆ
 *
 * TIP: ทำทีละข้อ แล้วเปิดหน้าเว็บดูผลทุกครั้ง อย่าเขียนรวดเดียว 6 ข้อ
 */

/**
 * QUEST 1 — ดึงคำทำนายทั้งหมด
 *
 * Endpoint: GET /api/fortunes
 * ต้อง return: Fortune[]
 *
 * ใช้ที่: src/app/fortunes/page.tsx (หน้า list)
 *
 * ขั้นตอน:
 *   1. await apiClient.get<Fortune[]>("/api/fortunes")
 *   2. return ค่าใน .data
 *
 * ตอนนี้ return [] ไว้ก่อน = หน้าเว็บจะโล่ง ๆ ไม่มีอะไรขึ้น
 */
export async function getAllFortunes(): Promise<Fortune[]> {
  return []
}

/**
 * QUEST 2 — สุ่มคำทำนาย 1 ใบ
 *
 * Endpoint: GET /api/fortunes/random
 * ต้อง return: Fortune (ใบเดียว ไม่ใช่ array)
 *
 * ใช้ที่: src/features/fortunes/components/ShakeSection.tsx (ตอนกดเขย่า)
 *
 * ระวัง: path คือ /random ไม่ใช่ /:id นะ ถ้าพิมพ์ผิดจะได้ 404
 */
export async function getRandomFortune(): Promise<Fortune> {
}

/**
 * QUEST 3 — ดึงคำทำนายตาม id
 *
 * Endpoint: GET /api/fortunes/:id
 * ต้อง return: Fortune
 *
 * ใช้ที่: src/app/fortunes/[id]/page.tsx และ [id]/edit/page.tsx
 *
 * ขั้นตอน: เอา id ที่รับเข้ามาต่อเข้า path
 *   ใช้ template string: `/api/fortunes/${id}`
 *
 * ถ้าไม่เจอ id server จะตอบ 404 -> axios จะ throw error ออกมาเอง
 */
export async function getFortuneById(id: number): Promise<Fortune> {
}

/**
 * FortuneInput = Fortune แต่ตัด id ออก
 * เพราะตอนสร้างใหม่ server เป็นคนแจก id ให้ เราไม่ต้องส่งไป
 */
export type FortuneInput = Omit<Fortune, "id">;

/**
 * QUEST 4 — สร้างคำทำนายใหม่
 *
 * Endpoint: POST /api/fortunes
 * Body: input (title กับ poem ต้องมี ไม่งั้น server ตอบ 400)
 * ต้อง return: Fortune ใบที่เพิ่งสร้าง (มี id มาให้แล้ว)
 *
 * ท่า POST ของ axios รับ 2 ตัว: apiClient.post(path, body)
 */
export async function createFortune(input: FortuneInput): Promise<Fortune> {
}

/**
 * QUEST 5 — แก้ไขคำทำนาย
 *
 * Endpoint: PUT /api/fortunes/:id
 * Body: input (เป็น Partial = ส่งไปแค่ field ที่จะแก้ก็พอ)
 * ต้อง return: Fortune ใบที่แก้แล้ว
 *
 * เหมือน QUEST 4 แต่เปลี่ยน .post เป็น .put แล้วต่อ id ใน path
 */
export async function updateFortune(id: number, input: Partial<FortuneInput>): Promise<Fortune> {
}

/**
 * QUEST 6 — ลบคำทำนาย
 *
 * Endpoint: DELETE /api/fortunes/:id
 * ต้อง return: void (ไม่ต้อง return อะไร แค่ await ให้เสร็จ)
 *
 * ใช้ apiClient.delete(...)
 */
export async function deleteFortune(id: number): Promise<void> {
}

/**
 * ========================================
 *  BONUS QUEST (ทำเมื่อ 1-6 ผ่านหมดแล้ว)
 * ========================================
 * path "/api/fortunes" ถูกพิมพ์ซ้ำหลายที่ ลองแยกเป็น const เดียว
 */