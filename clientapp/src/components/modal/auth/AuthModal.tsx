import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useToast,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import Login from "./Login";
import { appState } from "../../../atoms/AppAtom";
import SignUp from "./SignUp";
import ResetPassword from "./ResetPassword";
import { RecoilToggleModal } from "../../../atoms/app-atom-utils";
import { authState } from "../../../atoms/AuthAtom";

type AuthModalProps = {};

const AuthModal: React.FC<AuthModalProps> = () => {
  const [appRecoil, setAppRecoil] = useRecoilState(appState);
  const [authRecoil, setAuthRecoil] = useRecoilState(authState);
  
  const toast = useToast();

  const handleClose = () => {
    if(!authRecoil.logged) {
      toast({
        title: 'You must Sign In.',
        description: "Sign In to use the app.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      return;
    } 
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