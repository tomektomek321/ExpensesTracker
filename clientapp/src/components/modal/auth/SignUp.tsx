import React, { useState } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import InputItem from "../../layout/inputs/InputItem";
import { appState } from "../../../atoms/AppAtom";
import { AuthGateway } from "../../../domains/auth/auth-gateway";

export interface AuthRegister {
  Username: string;
  Email: string;
  Password: string;
}

const SignUp: React.FC = () => {

  const appRecoil = useSetRecoilState(appState);

  const [form, setForm] = useState({
    username: "tomek1",
    email: "tomek@wp.pl",
    password: "tomek1",
    confirmPassword: "tomek1",
  });

  const [formError, setFormError] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formError) setFormError("");

    if(form.username.length < 4 || form.email.length < 7) {
      return setFormError("username must be at least 4 characters");
    } 

    if(form.email.length < 7) {
      return setFormError("email must be at least 7 characters");
    }

    if (form.password !== form.confirmPassword) {
      return setFormError("Passwords do not match");
    }

    AuthGateway.register({'Username': form.username,
      'Email': form.email,
      'Password': form.password}).then( response => {
      console.log(response);
    })



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
        value={form.username}
        mb={2}
        onChange={onChange}
      />
      <InputItem
        name="email"
        placeholder="email"
        type="text"
        value={form.email}
        mb={2}
        onChange={onChange}
      />
      <InputItem
        name="password"
        placeholder="password"
        type="password"
        value={form.password}
        mb={2}
        onChange={onChange}
      />
      <InputItem
        name="confirmPassword"
        placeholder="confirm password"
        type="password"
        value={form.confirmPassword}
        onChange={onChange}
      />
      <Button
        width="100%"
        height="36px"
        mb={2}
        mt={2}
        type="submit"
        isLoading={false}
      >
        Sign Up
      </Button>
      <Flex fontSize="9pt" justifyContent="center">
        <Text mr={1}>Have an account?</Text>
        <Text
          color="blue.500"
          fontWeight={700}
          cursor="pointer"
          onClick={() => {
            appRecoil(prev => ({
              ...prev,
              viewModal: {
                ...prev.viewModal,
                view: "login",
              } 
            }))
          }}
        >
          LOG IN
        </Text>
        {formError || "" }
      </Flex>
    </form>
  );
};
export default SignUp;