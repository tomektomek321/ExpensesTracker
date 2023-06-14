import React, { useState } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import InputItem from "../../layout/inputs/InputItem";
import { appState } from "../../../atoms/AppAtom";

const SignUp: React.FC = () => {

  const appRecoil = useSetRecoilState(appState);

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formError, setFormError] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formError) setFormError("");
    if (!form.email.includes("@")) {
      return setFormError("Please enter a valid email");
    }

    if (form.password !== form.confirmPassword) {
      return setFormError("Passwords do not match");
    }
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
        mb={2}
        onChange={onChange}
      />
      <InputItem
        name="confirmPassword"
        placeholder="confirm password"
        type="password"
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
        {false || "" }
      </Flex>
    </form>
  );
};
export default SignUp;