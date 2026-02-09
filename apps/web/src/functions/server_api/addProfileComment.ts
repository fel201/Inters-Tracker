import { apiConfig } from "../../api/config";
export async function addProfileComment(
  comment: string,
  puuid: string,
  user_id: string,
) {
  try {
    const userId_int = parseInt(user_id);
    const URL = apiConfig.domain + `/api/inters/${puuid}/comments`;
    const request = await fetch(URL, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: comment,
        profilePuuid: puuid,
        userId: userId_int,
      }),
    });
    console.log(request.status);
    if (request.status == 401) {
      window.location.href = './login';
    }
    
  }
  catch(err) {
    console.error(err);
  }
}
