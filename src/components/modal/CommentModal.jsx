// import Button from "../common/Button";
// import Modal from "./Modal";

// function CommentModal({
//   handleCloseModal,
//   handleCharChange,
//   handleCommentSubmit,
//   comment,
//   charCount,
// }) {
//   return (
//     <Modal onClose={handleCloseModal}>
//       <div>
//         <textarea
//           value={comment}
//           onChange={handleCharChange}
//           maxLength="80"
//           placeholder="Write your comment here..."
//         />
//         <p>{charCount}/80 characters</p>
//         <Button type="secondary" onClick={handleCommentSubmit}>
//           Submit
//         </Button>
//       </div>
//     </Modal>
//   );
// }

// export default CommentModal;

import styles from "./CommentModal.module.css";
import Button from "../common/Button";

function CommentModal({
  handleCloseModal,
  handleCharChange,
  handleCommentSubmit,
  comment,
  charCount,
}) {
  return (
    <div>
      <textarea
        value={comment}
        onChange={handleCharChange}
        maxLength="80"
        placeholder="Write your comment here..."
      />
      <p>{charCount}/80 characters</p>
      <div className={styles.buttons}>
        <Button type="quaternary" onClick={handleCommentSubmit}>
          Submit
        </Button>
        <Button type="secondary" onClick={handleCloseModal}>
          Close
        </Button>
      </div>
    </div>
  );
}

export default CommentModal;
