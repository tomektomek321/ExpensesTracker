import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import Login from "./Login";
import { appState } from "../../../atoms/AppAtom";
import SignUp from "./SignUp";

type AuthModalProps = {};

const AuthModal: React.FC<AuthModalProps> = () => {
  const [modalState, setModalState] = useRecoilState(appState);

  const handleClose = () =>
    setModalState((prev) => ({
      ...prev,
      viewModal: {
        ...prev.viewModal,
        open: false,
      },
    }));
  
  return (
    <>
      <Modal isOpen={modalState.viewModal.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {/* {modalState.viewModal.view === "reset" && "Reset Password"} */}
            {modalState.viewModal.view === "login" && "Login"}
            {modalState.viewModal.view === "signup" && "Sign Up"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* {modalState.viewModal.view === "reset" && <ResetPassword />} */}
            {modalState.viewModal.view === "login" && <Login />}
            {modalState.viewModal.view === "signup" && <SignUp />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AuthModal;