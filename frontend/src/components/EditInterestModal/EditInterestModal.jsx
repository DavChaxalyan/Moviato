import React from "react";
import useModal from "../../hooks/useModal";
import InterestModal from "../InterestModal";
const EditInterestModal = () => {
  const { isOpen, handleOpen, handleClose } = useModal();

  return (
    <>{isOpen ? <button onClick={handleOpen}>Edit My Interest</button> : <InterestModal handleClose={handleClose} />}</>
  );
};

export default EditInterestModal;
