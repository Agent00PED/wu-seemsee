# WU SeemSee Server

REST API ให้บริการคำทำนายเซียมซี, เขียนด้วย Express + TypeScript, เก็บข้อมูลผ่าน lowdb (`db.json`).

## Getting Started

```bash
npm install
npm run dev   # tsx watch, http://localhost:4000
```

## Endpoints

Base path: `/api/fortunes`

| Method | Path | Description | Body |
|---|---|---|---|
| GET | `/api/fortunes` | เอาคำทำนายทั้งหมด | - |
| GET | `/api/fortunes/random` | สุ่มคำทำนาย 1 ใบ | - |
| GET | `/api/fortunes/:id` | เอาคำทำนายตาม id | - |
| POST | `/api/fortunes` | สร้างคำทำนายใหม่ | `{ title, poem, prediction?, item?, image? }` |
| PUT | `/api/fortunes/:id` | แก้ไขคำทำนาย | `Partial<FortuneInput>` |
| DELETE | `/api/fortunes/:id` | ลบคำทำนาย | - |

## Fortune model

```ts
{
  id: number;
  title: string;
  poem: string;
  prediction: string;
  item: string;
  image: string | null;
}
```

## Notes

- `POST` ต้องมี `title` กับ `poem` ไม่งั้น 400
- ไม่พบ id คืน 404
- `GET /random` ต้องมาก่อน `/:id` ใน route order
