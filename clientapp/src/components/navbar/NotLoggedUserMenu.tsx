import React from "react";
import { MenuItem, Flex, Text } from "@chakra-ui/react";
import { addTestBudget } from "../../domains/expenses/expenses2-gateway";
import { useSetRecoilState } from "recoil";
import { appState } from "../../atoms/AppAtom";
import { RecoilOpenModal } from "../../atoms/app-atom-utils";

const NotLoggedUserMenu: React.FC = () => {
  const  setAppRecoil = useSetRecoilState(appState);

  const testSeed = () => {
    addTestBudget();
  }

  const openLogIn = () => {
    RecoilOpenModal(setAppRecoil, 'login');
  }

  const openSignUp = () => {
    RecoilOpenModal(setAppRecoil, 'signup');
  }

  return (
    <>
      <MenuItem
        fontSize="10pt"
        fontWeight={700}
        _hover={{ bg: "blue.500", color: "white" }}
        onClick={openLogIn}
      >
        <Flex alignItems="center">
          {/* <Icon fontSize={20} mr={2} as={MdOutlineLogin} /> */}
          <Text fontSize="16px" ml={3} fontWeight={600}>
            Zaloguj
          </Text>
        </Flex>
      </MenuItem>
      <MenuItem
        fontSize="10pt"
        fontWeight={700}
        _hover={{ bg: "blue.500", color: "white" }}
        onClick={openSignUp}
      >
        <Flex alignItems="center">
          {/* <Icon fontSize={20} mr={2} as={MdOutlineLogin} /> */}
          <Text fontSize="16px" ml={3} fontWeight={600}>
            Zarejestruj
          </Text>
        </Flex>
      </MenuItem>
      <MenuItem
        fontSize="10pt"
        fontWeight={700}
        _hover={{ bg: "blue.500", color: "white" }}
      >
        <Flex alignItems="center" onClick={testSeed}>
          {/* <Icon fontSize={20} mr={2} as={MdOutlineLogin} /> */}
          <Text fontSize="16px" ml={3} fontWeight={600}>
            Seed db
          </Text>
          
        </Flex>
      </MenuItem>
    </>
  );
};
export default NotLoggedUserMenu;