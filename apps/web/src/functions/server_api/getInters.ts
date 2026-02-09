import { apiConfig } from "../../api/config";
export async function getInters() {
  const URL = apiConfig.domain + "/api/inters";
  const request = await fetch(URL);
  return await request.json();
}




