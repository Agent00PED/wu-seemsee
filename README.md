# WU SeemSee (มู)

เว็บเซียมซีมวลชน สร้างเพื่อสอนน้อง Web Camp ตั้งแต่หน้าบ้านถึงหลังบ้าน

## Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js (App Router) + React + Tailwind |
| Backend | Express + TypeScript (tsx) |
| Database | lowdb (`db.json`) |

## Features

| Feature | Description |
|---|---|
| เขย่าเซียมซีสุ่มดวง | สุ่มคำทำนาย พร้อมอนิเมชันเขย่ากระบอก |
| จัดการคำทำนาย (CRUD) | เพิ่ม แก้ไข ลบ ดูคำทำนายทั้งหมด ผ่าน REST API |
| ทัวร์แนะนำเมนู | ไกด์ชี้เมนูอัตโนมัติสำหรับผู้ใช้ใหม่ (จำสถานะด้วย localStorage) |
| ธีมกระดาษเซียมซี | โทนสีแดงชาด-ทอง ฟอนต์ไทยเฉพาะ |

## Structure

```
client/   Next.js frontend
server/   Express REST API (see server/README.md)
bruno/    API request collection for testing
```

## Getting Started

Server:

```bash
cd server
npm install
npm run dev   # http://localhost:4000
```

Client:

```bash
cd client
npm install
npm run dev   # http://localhost:3000
```

See [server/README.md](server/README.md) for API docs.
