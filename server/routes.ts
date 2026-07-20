import express, { Request, Response } from "express";
import * as fortunes from "./data.js";

const router = express.Router();

// GET /api/fortunes - เอาคำทำนายทั้งหมด
router.get("/", async (req: Request, res: Response) => {
  res.json(await fortunes.getAll());
});

// GET /api/fortunes/random - สุ่มคำทำนาย 1 ใบ
// ต้องอยู่ก่อน "/:id" ไม่งั้น express จะเข้าใจว่า "random" คือ id
router.get("/random", async (req: Request, res: Response) => {
  const fortune = await fortunes.getRandom();
  if (!fortune) return res.status(404).json({ error: "ยังไม่มีคำทำนายในระบบ" });
  res.json(fortune);
});

// GET /api/fortunes/:id - เอาคำทำนายตาม id
router.get("/:id", async (req: Request, res: Response) => {
  const fortune = await fortunes.getById(Number(req.params.id));
  if (!fortune) return res.status(404).json({ error: "ไม่พบคำทำนาย" });
  res.json(fortune);
});

// POST /api/fortunes - สร้างคำทำนายใหม่
router.post("/", async (req: Request, res: Response) => {
  const { title, poem, prediction, item, image } = req.body;
  if (!title || !poem) {
    return res.status(400).json({ error: "ต้องมี title กับ poem" });
  }
  const created = await fortunes.create({ title, poem, prediction, item, image });
  res.status(201).json(created);
});

// PUT /api/fortunes/:id - แก้ไขคำทำนาย
router.put("/:id", async (req: Request, res: Response) => {
  const updated = await fortunes.update(Number(req.params.id), req.body);
  if (!updated) return res.status(404).json({ error: "ไม่พบคำทำนาย" });
  res.json(updated);
});

// DELETE /api/fortunes/:id - ลบคำทำนาย
router.delete("/:id", async (req: Request, res: Response) => {
  const ok = await fortunes.remove(Number(req.params.id));
  if (!ok) return res.status(404).json({ error: "ไม่พบคำทำนาย" });
  res.status(204).send();
});

export default router;
