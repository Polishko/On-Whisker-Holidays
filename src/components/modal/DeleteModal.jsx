import Button from "../common/Button";
import Modal from "./Modal";

function DeleteModal({ closeDeleteModal, handleDelete }) {
  return (
    <Modal
      onClose={closeDeleteModal}
      customClass="customModalButton"
      showCloseButton={false}
    >
      <div>
        <h3>Are you sure you want to delete this comment?</h3>
        <div>
          <Button onClick={handleDelete} type="quaternary">
            Yes
          </Button>
          <Button onClick={closeDeleteModal} type="secondary">
            No
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteModal;
