import { apiConfig } from "../../api/config";
import type { Inters } from "../../types/inters";
export async function getInters(): Promise<Inters> {
  const URL = apiConfig.domain + "/api/inters";
  const request = await fetch(URL);
  return await request.json();
};




