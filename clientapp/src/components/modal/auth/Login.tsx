import React, { useState } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import InputItem from "../../layout/inputs/InputItem";
import { appState } from "../../../atoms/AppAtom";
import { authState } from "../../../atoms/AuthAtom";
import { AuthGateway, AuthLoginResponse } from "../../../domains/auth/auth-gateway";
import { RecoilToggleModal } from "../../../atoms/app-atom-utils";
import { RecoilSignIn } from "../../../atoms/auth-atom-utils";

export interface AuthLoginPayload {
  Username: string;
  Password: string;
}

const Login: React.FC = () => {

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [formError, setFormError] = useState("");

  const setAppRecoil = useSetRecoilState(appState);
  const setAuthRecoil = useSetRecoilState(authState);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    AuthGateway.login({Username: form.username, Password: form.password})
    .then((response: AuthLoginResponse) => {
      RecoilSignIn(setAppRecoil,  form.username,response.token);
      RecoilToggleModal(setAppRecoil, false);
    }).catch(e => {
      console.log(e);
      setFormError("login error TODO");
    });
  };

  const onChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      <InputItem
        name="username"
        placeholder="username"
        type="text"
        mb={2}
        onChange={onChange}
      />
      <InputItem
        name="password"
        placeholder="password"
        type="password"
        onChange={onChange}
      />
      <Button
        width="100%"
        height="36px"
        mb={2}
        mt={2}
        type="submit"
      >
        Log In
      </Button>
      <Flex mt={2} justifyContent="center" mb={2}>
        <Text fontSize="9pt" mr={1}>
          Forgot your password?
        </Text>
        <Text
          fontSize="9pt"
          color="blue.500"
          cursor="pointer"
          onClick={() => {
            setAppRecoil(prev => ({
              ...prev,
              viewModal: {
                ...prev.viewModal,
                view: "reset",
              } 
            }))
          }}
        >
          Reset
        </Text>
      </Flex>
      <Flex my={2} fontSize="9pt" justifyContent="center">
        <Text mr={2}>New here?</Text>
        <Text
          color="blue.500"
          fontWeight={700}
          cursor="pointer"
          onClick={() => {
            setAppRecoil(prev => ({
              ...prev,
              viewModal: {
                ...prev.viewModal,
                view: "signup",
              } 
            }))
           }}
        >
          SIGN UP
        </Text>
      </Flex>
    </form>
  );
};
export default Login;