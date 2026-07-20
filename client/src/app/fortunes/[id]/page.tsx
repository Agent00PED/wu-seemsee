import Link from "next/link";
import { notFound } from "next/navigation";
import { getFortuneById } from "@/features/fortunes/api";
import FortuneCard from "@/features/fortunes/components/FortuneCard";
import DeleteFortuneButton from "@/features/fortunes/components/DeleteFortuneButton";

export default async function FortuneDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const fortune = await getFortuneById(Number(id)).catch(() => null);
  if (!fortune) notFound();

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-5 py-10">
      <Link href="/fortunes" className="text-sm text-muted hover:text-foreground hover:underline">
        ← กลับ
      </Link>

      <FortuneCard fortune={fortune} />

      <div className="flex gap-3">
        <Link
          href={`/fortunes/${fortune.id}/edit`}
          className="flex-1 rounded-md border border-border py-2 text-center text-sm text-foreground/80 hover:bg-surface"
        >
          แก้ไข
        </Link>
        <DeleteFortuneButton id={fortune.id} />
      </div>
    </div>
  );
}
