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
import ResetPassword from "./ResetPassword";
import { RecoilToggleModal } from "../../../atoms/app-atom-utils";

type AuthModalProps = {};

const AuthModal: React.FC<AuthModalProps> = () => {
  const [appRecoil, setAppRecoil] = useRecoilState(appState);

  const handleClose = () => {
    RecoilToggleModal(setAppRecoil, false);
  }
  
  return (
    <>
      <Modal isOpen={appRecoil.viewModal.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent p={5}>
          <ModalHeader>
            {appRecoil.viewModal.view === "reset" && "Reset Password"}
            {appRecoil.viewModal.view === "login" && "Login"}
            {appRecoil.viewModal.view === "signup" && "Sign Up"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {appRecoil.viewModal.view === "reset" && <ResetPassword />}
            {appRecoil.viewModal.view === "login" && <Login />}
            {appRecoil.viewModal.view === "signup" && <SignUp />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AuthModal;