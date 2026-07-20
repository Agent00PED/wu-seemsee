import { apiClient } from "@/lib/apiClient";
import type { Fortune } from "./types";

export async function getAllFortunes(): Promise<Fortune[]> {
  const res = await apiClient.get<Fortune[]>("/api/fortunes");
  return res.data;
}

export async function getRandomFortune(): Promise<Fortune> {
  const res = await apiClient.get<Fortune>("/api/fortunes/random");
  return res.data;
}

export async function getFortuneById(id: number): Promise<Fortune> {
  const res = await apiClient.get<Fortune>(`/api/fortunes/${id}`);
  return res.data;
}

export type FortuneInput = Omit<Fortune, "id">;

export async function createFortune(input: FortuneInput): Promise<Fortune> {
  const res = await apiClient.post<Fortune>("/api/fortunes", input);
  return res.data;
}

export async function updateFortune(id: number, input: Partial<FortuneInput>): Promise<Fortune> {
  const res = await apiClient.put<Fortune>(`/api/fortunes/${id}`, input);
  return res.data;
}

export async function deleteFortune(id: number): Promise<void> {
  await apiClient.delete(`/api/fortunes/${id}`);
}
