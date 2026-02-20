import { useEffect, useRef, useState } from "react";
import "./style/comments.css";
import { retrieveProfileComments } from "../../functions/server_api/retrieveProfileComments";
import { handleCommentEvent } from "../../functions/handleCommentEvent";
import { Loading } from "../Loading/Loading";
type UserComment = [
  {
    content: string;
    player_puuid: string;
    user_id: number;
    username: string;
  },
];

interface CommentsProps {
  puuid: string;
}

function hasComments(comments: UserComment): comments is UserComment {
  return (comments as UserComment)[0].player_puuid !== undefined;
}

export function Comments({ puuid }: CommentsProps) {
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);
  const [comments, setComments] = useState<UserComment | null>(null);
  useEffect(() => {
    const handleCommentSubmission = async (event: MouseEvent) => {
      await handleCommentEvent(event, puuid);
    };

    if (submitButtonRef.current != null) {
      submitButtonRef.current.addEventListener(
        "click",
        handleCommentSubmission,
      );
    }
    return () => {
      submitButtonRef.current?.removeEventListener(
        "click",
        handleCommentSubmission,
      );
    };
  }, []);
  useEffect(() => {
    const fetchComments = async () => {
      const req = await retrieveProfileComments(puuid);
      if (!hasComments(req)) return;
      setComments(req);
    };
    fetchComments();
  }, []);

  return (
    <>
      <form id="comment-form" action="">
        <textarea
          maxLength={140}
          id="comment-textarea"
          placeholder="Write a comment (140 character limit)"
          name="comment"
        ></textarea>
        <button id="submit-button">Comment</button>
      </form>
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
    </>
  );
}
