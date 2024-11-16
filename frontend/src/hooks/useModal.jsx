import { useState } from "react";

const useModal = () => {
  const [state, setState] = useState(false);

  const handleOpen = () => {
    setState(true);
  };
  const handleClose = () => {
    setState(false);
  };
  return { isOpen: state, handleOpen, handleClose };
};

export default useModal;
