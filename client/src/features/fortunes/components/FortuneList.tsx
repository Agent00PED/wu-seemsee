import type { Fortune } from "../types";
import FortuneCard from "./FortuneCard";

export default function FortuneList({ fortunes }: { fortunes: Fortune[] }) {
  if (fortunes.length === 0) {
    return <p className="text-center text-gray-500">ยังไม่มีคำทำนายในระบบ</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {fortunes.map((fortune) => (
        <FortuneCard key={fortune.id} fortune={fortune} />
      ))}
    </div>
  );
}
