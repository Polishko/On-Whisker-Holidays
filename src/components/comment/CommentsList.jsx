import styles from "./CommentsList.module.css";
import { useComments } from "../contexts/CommentsContext";
import { useHotels } from "../contexts/HotelsContext";
import Message from "../common/Message";
import CommentItem from "./CommentItem";
import { Link } from "react-router-dom";

function CommentsList() {
  const { comments } = useComments();
  const { currentHotel } = useHotels();

  if (!currentHotel.hotelName) return;

  const filteredComments = comments.filter(
    (comment) => comment.hotelId === currentHotel.id
  );

  if (filteredComments.length === 0)
    return (
      <div className={styles.noCommentsMessage}>
        <Message
          message={"Currently there are no comments for this hotel."}
          background={"light"}
        />
        <p>
          <Link to="/register">Register to add your first comment!</Link>
        </p>
      </div>
    );

  return (
    <div className={styles.commentList}>
      <h3>Visitors&apos; comments</h3>
      <ul>
        {filteredComments.map((comment) => {
          return (
            <CommentItem
              comment={comment}
              key={comment.id}
              userName={comment.userName}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default CommentsList;
