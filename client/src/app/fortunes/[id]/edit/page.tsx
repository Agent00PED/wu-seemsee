import { notFound } from "next/navigation";
import { getFortuneById } from "@/features/fortunes/api";
import FortuneForm from "@/features/fortunes/components/FortuneForm";

export default async function EditFortunePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const fortune = await getFortuneById(Number(id)).catch(() => null);
  if (!fortune) notFound();

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-5 py-10">
      <h1 className="font-[family-name:var(--font-serif-th)] text-2xl text-foreground">
        แก้ไขใบเซียมซี
      </h1>
      <FortuneForm mode="edit" id={fortune.id} initialValues={fortune} />
    </div>
  );
}
