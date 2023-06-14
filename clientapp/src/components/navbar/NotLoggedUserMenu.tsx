import React from "react";
import { MenuItem, Flex, Icon, Text } from "@chakra-ui/react";
import { MdOutlineLogin } from "react-icons/md";
import { addTestBudget } from "../../domains/expenses/expenses-gateway";
import AuthModal from "../modal/auth/AuthModal";
import { useSetRecoilState } from "recoil";
import { appState } from "../../atoms/AppAtom";

const NotLoggedUserMenu: React.FC = () => {
  const  setModalState = useSetRecoilState(appState);


  const testSeed = () => {
    addTestBudget();
    // addTestExpenses();
  }

  const openLogIn = () => {
    setModalState(prev => {
      return {
        ...prev,
        viewModal: {
          ...prev.viewModal,
          open: true,
        }
      }
    })
  }

  return (
    <>
      <AuthModal />
      <MenuItem
        fontSize="10pt"
        fontWeight={700}
        _hover={{ bg: "blue.500", color: "white" }}
      >
        <Flex alignItems="center" onClick={openLogIn}>
          <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
          <Text fontSize="16px" fontWeight={600}>
            Zaloguj
          </Text>
          
        </Flex>
      </MenuItem>
      <MenuItem
        fontSize="10pt"
        fontWeight={700}
        _hover={{ bg: "blue.500", color: "white" }}
      >
        <Flex alignItems="center">
          <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
          <Text fontSize="16px" fontWeight={600}>
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
          <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
          <Text fontSize="16px" fontWeight={600}>
            Seed db
          </Text>
          
        </Flex>
      </MenuItem>
    </>
  );
};
export default NotLoggedUserMenu;