import { ProfileQuery } from "../../../db/database.ts";
import jwt from "jsonwebtoken";
import { ENV } from "../../env.ts";
const profileQuery = new ProfileQuery();
export async function commentPostService(
  comment: string,
  puuid: string,
  accessToken: string,
  commenterId: string,
) {
  const validToken = await jwt.verify(accessToken, ENV.JWT_KEY);
  if (!validToken) {
    return {
      success: false,
      message: "Access Token Expired",
      expiredToken: true
    }
  }
  
  const inter_rows = await profileQuery.getByPuuid(puuid);

  if (inter_rows.length == 0) {
    await profileQuery.add(puuid);
  } 

  await profileQuery.addComment(puuid, commenterId, comment);
  
  return {
    success: true,
    message: "Operation was successful",
    expiredToken: false
  };
}
