import React, { useState } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useRecoilState, useSetRecoilState } from "recoil";
import InputItem from "../../layout/inputs/InputItem";
import { appState } from "../../../atoms/AppAtom";
import { authData, persistUser, testLogin } from "../../../domains/expenses/expenses-gateway";
import { authState } from "../../../atoms/AuthAtom";

const Login: React.FC = () => {

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState("");

  const [appRecoil, setAppRecoil] = useRecoilState(appState);
  const [authRecoil, setAuthRecoil] = useRecoilState(authState);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formError) {setFormError(""); return;}

    testLogin(form.email, form.password).then((user: authData | false) => {
      console.log(user);
      if(user) {
        persistUser(user.email, user.token);
        setAuthRecoil(prev => {
          return {
            ...prev,
            email: user.email,
            token: user.token,
            logged: true,
            displayName: user.email.split("@")[0],
          }
        });

        setAppRecoil(prev => {
          return {
            ...prev,
            viewModal: {
              ...prev.viewModal,
              open: false,
            }
          }
        })
      }
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
        name="email"
        placeholder="email"
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