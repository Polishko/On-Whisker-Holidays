import Message from "../Common/Message";
import { useComments } from "../contexts/CommentsContext";
import { useHotels } from "../contexts/HotelsContext";
import { useUsers } from "../contexts/UsersContext";
import CommentItem from "./CommentItem";
import styles from "./CommentsList.module.css";

function CommentsList() {
  const { comments } = useComments();
  const { users } = useUsers();
  const { currentHotel } = useHotels();

  const filteredComments = comments.filter(
    (comment) => comment.hotelId === currentHotel.id
  );

  if (!currentHotel.hotelName) return;

  if (currentHotel.hotelName && filteredComments.length === 0)
    return (
      <Message
        message={"Currently there are no comments for this hotel."}
        background={"light"}
      />
    );

  return (
    <ul className={styles.commentList}>
      <div className={styles.commentsInner}>
        {filteredComments.map((comment) => (
          <CommentItem
            comment={comment}
            key={comment.id}
            user={users.filter((user) => user.id === comment.userId)[0]}
          />
        ))}
      </div>
    </ul>
  );
}

export default CommentsList;
