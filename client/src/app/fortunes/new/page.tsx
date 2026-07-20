import FortuneForm from "@/features/fortunes/components/FortuneForm";

export default function NewFortunePage() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-5 py-10">
      <h1 className="font-[family-name:var(--font-serif-th)] text-2xl text-foreground">
        สร้างใบเซียมซีใหม่
      </h1>
      <FortuneForm mode="create" />
    </div>
  );
}
