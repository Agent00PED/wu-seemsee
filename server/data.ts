import { JSONFilePreset } from "lowdb/node";
import type { Fortune, FortuneInput, FortuneUpdate } from "./types.js";

interface Schema {
  fortunes: Fortune[];
  nextId: number;
}

const defaultData: Schema = {
  fortunes: [
    {
      id: 1,
      title: "สู้ชีวิตแต่ชีวิตสู้กลับ",
      poem: "อันว่าดวง ช่วงนี้ มีแต่แบก\nงานโคตรแปลก สั่งเมื่อวาน จะเอาเช้า\nเงินในตู้ บินหนี ไม่เหลือเงา\nสั่งชาไทย รสชาติเน่า เศร้าใจจริง",
      prediction: "สัปดาห์นี้ดวงแบกโลก งานเข้าพร้อมกันโดยไม่ได้นัดหมาย",
      item: "ยาหม่องน้ำ + ชาไทยหวาน 120%",
      image: null,
    },
    {
      id: 2,
      title: "Enter Villain Era",
      poem: "เบื่อเป็นคน สุภาพ และแสนดี\nต่อจากนี้ ใครทักมา กุมขมับ\nปิดแจ้งเตือน ไลน์มา ไม่ยอมรับ\nใครมาขัด จะสวบกลับ ให้จมดิน",
      prediction: "ถึงเวลาเลิกเป็นคนดี แล้วหันมาตั้งใจหาเงิน ความอดทนต่ำแต่เงินต้องสูง",
      item: "หูฟังบลูทูธตัดเสียงรบกวน (Noise Cancelling)",
      image: null,
    },
    {
      id: 3,
      title: "ดวงตัวมัม ตัวคลอดบุตร",
      poem: "ออร่าจับ เงินเข้า ไม่ขาดสาย\nเรื่องร้ายร้าย แพ้พ่าย หายไปหมด\nกดบัตรคอน ได้แถวหน้า สมใจกด\nแชตไม่แห้ง หน้าไม่ดรอป สดใสจริง",
      prediction: "สัปดาห์นี้จักรวาลหมุนรอบตัวคุณ ทำอะไรก็มีคนเปย์ มีคนเห็นค่า",
      item: "สวมชุดสีมงคลตามตารางประจำวัน",
      image: null,
    },
  ],
  nextId: 4,
};

const db = await JSONFilePreset<Schema>("db.json", defaultData);

export async function getAll(): Promise<Fortune[]> {
  await db.read();
  return db.data.fortunes;
}

export async function getRandom(): Promise<Fortune | undefined> {
  await db.read();
  const { fortunes } = db.data;
  return fortunes[Math.floor(Math.random() * fortunes.length)];
}

/**
 * QUEST 10 — ดึงคำทำนาย 1 ใบจาก id (ฝั่ง server)
 *
 * ต้อง return: Fortune ที่ตรงกับ id หรือ `undefined` ถ้าหาไม่เจอ
 *
 * ใช้ที่: GET /api/fortunes/:id ใน routes.ts
 *   -> ถ้าฟังก์ชันนี้คืน undefined route จะตอบ 404 ให้เอง
 *   -> แปลว่าตอนนี้ QUEST 3 ฝั่ง client จะพังตลอด จนกว่าข้อนี้จะเสร็จ
 *
 * ขั้นตอน:
 *   1. อ่านข้อมูลล่าสุดจากไฟล์ก่อนด้วย `await db.read()` (ลอกจาก getAll ข้างบน)
 *   2. รายการคำทำนายทั้งหมดอยู่ที่ `db.data.fortunes`
 *   3. ใช้ Array method `.find()` หาตัวแรกที่ `f.id` เท่ากับ `id`
 *
 * ไม่ต้องเช็ก "ถ้าไม่เจอ" เพิ่ม เพราะ `.find()` คืน `undefined` ให้เองอยู่แล้ว
 *
 * เช็กว่าผ่าน: เปิด http://localhost:4000/api/fortunes/1 ต้องได้ JSON 1 ใบ
 *              ส่วน /api/fortunes/999 ต้องได้ 404
 */
export async function getById(id: number): Promise<Fortune | undefined> {
  return undefined;
}

export async function create(input: FortuneInput): Promise<Fortune> {
  await db.read();
  const newFortune: Fortune = { id: db.data.nextId++, ...input };
  db.data.fortunes.push(newFortune);
  await db.write();
  return newFortune;
}

export async function update(id: number, changes: FortuneUpdate): Promise<Fortune | null> {
  await db.read();
  const fortune = db.data.fortunes.find((f) => f.id === id);
  if (!fortune) return null;
  Object.assign(fortune, changes);
  await db.write();
  return fortune;
}

export async function remove(id: number): Promise<boolean> {
  await db.read();
  const index = db.data.fortunes.findIndex((f) => f.id === id);
  if (index === -1) return false;
  db.data.fortunes.splice(index, 1);
  await db.write();
  return true;
}
