import "./style/comments.css";
import { handleCommentEvent } from "../../functions/handleCommentEvent";;
import type { ProfileProps } from "./Profile";
import { useRef, useEffect } from "react";

export function CommentForm({profile}: ProfileProps) {
  const submitCommentRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    const handleCommentSubmission = async (event: MouseEvent) => {
      await handleCommentEvent(event, profile.account.puuid);
    };

    if (submitCommentRef.current != null) {
      submitCommentRef.current.addEventListener(
        "click",
        handleCommentSubmission,
      );
    }
    return () => {
      submitCommentRef.current?.removeEventListener(
        "click",
        handleCommentSubmission,
      );
    };
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
        <button id="submit-comment" ref={submitCommentRef}>
          Comment
        </button>
      </form>
    </>
  );
}
