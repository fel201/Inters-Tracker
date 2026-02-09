import { addProfileComment } from "./server_api/addProfileComment";


export async function handleCommentEvent(e: MouseEvent, puuid: string) {
  e.preventDefault();
  const textarea = document.getElementById(
    "comment-textarea",
  ) as HTMLTextAreaElement;
  const comment = textarea.value;
  if (comment == "") return;
  const cookie = await cookieStore.get("user_id");
  await addProfileComment(comment, puuid, cookie?.value);
}
