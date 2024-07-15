import styles from "./CommentsList.module.css";
import { useComments } from "../contexts/CommentsContext";
import { useHotels } from "../contexts/HotelsContext";
import { useUsers } from "../contexts/UsersContext";
// import { useAuth } from "../contexts/AuthContext";
import Message from "../Common/Message";
import CommentItem from "./CommentItem";

function CommentsList() {
  const { comments } = useComments();
  const { users } = useUsers();
  const { currentHotel } = useHotels();

  if (!currentHotel.hotelName) return;

  const filteredComments = comments.filter(
    (comment) => comment.hotelId === currentHotel.id
  );

  if (filteredComments.length === 0)
    return (
      <Message
        message={"Currently there are no comments for this hotel."}
        background={"light"}
      />
    );

  return (
    <ul className={styles.commentList}>
      {filteredComments.map((comment) => {
        const user = users.find((user) => user.id === comment.userId);
        return (
          <CommentItem
            comment={comment}
            key={comment.id}
            userName={user.name}
          />
        );
      })}
    </ul>
  );
}

export default CommentsList;
