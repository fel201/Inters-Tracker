import { apiConfig } from "../../api/config";
export async function deleteUserCookies() {
  await cookieStore.delete("username");
  await cookieStore.delete("user_id");
  await fetch(`${apiConfig.domain}/api/session`, {
    method: "DELETE",
    credentials: "include",
  });
}
