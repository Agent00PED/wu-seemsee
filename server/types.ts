export interface Fortune {
  id: number;
  title: string;
  poem: string;
  prediction: string;
  item: string;
  image: string | null;
}

export type FortuneInput = Omit<Fortune, "id">;
export type FortuneUpdate = Partial<FortuneInput>;
