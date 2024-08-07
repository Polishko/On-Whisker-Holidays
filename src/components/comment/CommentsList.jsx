import { Link } from "react-router-dom";

import styles from "./CommentsList.module.css";

import { useComments } from "../contexts/CommentsContext";
import { useHotels } from "../contexts/HotelsContext";
import { useAuth } from "../contexts/AuthContext";

import Message from "../common/Message";
import CommentItem from "./CommentItem";

function CommentsList() {
  const { comments, isLoading } = useComments();
  const { currentHotel } = useHotels();
  const { isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className={styles.commentList}>
        <Spinner />
      </div>
    );
  }

  if (!currentHotel.hotelName) return;

  const filteredComments = comments.filter(
    (comment) => comment.hotelId === currentHotel.id
  );

  const commentCount = filteredComments.length;

  if (commentCount === 0)
    return (
      <div className={styles.noCommentsMessage}>
        <Message
          message={"Currently there are no comments for this hotel."}
          background={"light"}
        />
        {!isAuthenticated && (
          <p>
            <Link to="/register">Register to add your first comment!</Link>
          </p>
        )}
      </div>
    );

  return (
    <div className={styles.commentList}>
      <div className={styles.commentsHeader}>
        <h3>Visitors&apos; comments</h3>
        <p>
          {commentCount === 1
            ? `${commentCount} comment`
            : `${commentCount} comments`}
        </p>
      </div>
      <ul>
        {filteredComments.map((comment) => (
          <CommentItem
            comment={comment}
            key={comment.id}
            userName={comment.userName}
          />
        ))}
      </ul>
    </div>
  );
}

export default CommentsList;
