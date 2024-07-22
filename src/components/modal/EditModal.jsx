import Button from "../common/Button";
import Modal from "./Modal";

function EditModal({ closeEditModal, handleEdit }) {
  return (
    <Modal
      onClose={closeEditModal}
      customClass="customModalButton"
      showCloseButton={false}
    >
      <div>
        <h3>Are you sure you want to edit this comment?</h3>
        <div>
          <Button onClick={handleEdit} type="primary">
            Yes
          </Button>
          <Button onClick={closeEditModal} type="secondary">
            No
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default EditModal;
