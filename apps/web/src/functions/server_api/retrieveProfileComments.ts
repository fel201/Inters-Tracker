import { apiConfig } from "../../api/config";
export async function retrieveProfileComments(puuid: string) {
    const URL = apiConfig.domain + `/api/inters/${puuid}/comments`
    const request = await fetch(URL);
    const response = await request.json();
    return response;
}
