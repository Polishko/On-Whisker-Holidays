import { useState } from "react";

export function useModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const openModal = (message = "") => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage("");
  };

  return {
    isModalOpen,
    modalMessage,
    openModal,
    closeModal,
  };
}
