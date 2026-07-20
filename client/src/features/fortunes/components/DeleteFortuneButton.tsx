"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteFortune } from "../api";

export default function DeleteFortuneButton({ id }: { id: number }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("ลบใบเซียมซีนี้?")) return;
    setDeleting(true);
    await deleteFortune(id);
    router.push("/fortunes");
    router.refresh();
  };

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="flex-1 rounded-md border border-cinnabar/40 py-2 text-sm text-cinnabar hover:bg-cinnabar/10 disabled:opacity-50"
    >
      {deleting ? "กำลังลบ..." : "ลบ"}
    </button>
  );
}
