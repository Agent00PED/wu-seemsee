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

export async function getById(id: number): Promise<Fortune | undefined> {
  await db.read();
  return db.data.fortunes.find((f) => f.id === id);
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
