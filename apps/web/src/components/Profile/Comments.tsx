import { useEffect, useState } from "react";
import { CommentForm } from "./CommentForm";
import "./style/comments.css";
import { retrieveProfileComments } from "../../functions/server_api/retrieveProfileComments";
import { Loading } from "../Loading/Loading";
import type { ProfileProps } from "./Profile";
type UserComment = [
  {
    content: string;
    player_puuid: string;
    user_id: number;
    username: string;
  },
];

function hasComments(comments: UserComment): comments is UserComment {
  return (comments as UserComment)[0].player_puuid !== undefined;
}

export function Comments({ profile }: ProfileProps) {
  const [comments, setComments] = useState<UserComment | null>(null);


  useEffect(() => {
    const fetchComments = async () => {
      const req = await retrieveProfileComments(profile.account.puuid);
      if (!hasComments(req)) return;
      setComments(req);
    };
    fetchComments();
  }, []);

  if (profile.summonerInfo == undefined) {
    return null;
  }

  return (
    <div id="comments-wrapper">
      <CommentForm profile={profile} />
      <div className="comments">
        {comments != null ? (
          comments.map((comment) => {
            return (
              <div className="comment">
                <p className="comment-content">
                  {comment != null ? comment.content : <Loading />}
                </p>
                <h5>
                  {comment != null ? comment.username : <Loading />} 21/12/2014
                  08:07:54{" "}
                </h5>
              </div>
            );
          })
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
