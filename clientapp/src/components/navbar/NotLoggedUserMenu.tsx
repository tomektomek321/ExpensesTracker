import React from "react";
import { MenuItem, Flex, Icon, Text } from "@chakra-ui/react";
import { MdOutlineLogin } from "react-icons/md";
import { addTestBudget, addTestExpenses } from "../../domains/expenses/expenses-gateway";

const NotLoggedUserMenu: React.FC = () => {

  const testSeed = () => {
    addTestBudget();
    addTestExpenses();
  }

  return (
    <>
      <MenuItem
        fontSize="10pt"
        fontWeight={700}
        _hover={{ bg: "blue.500", color: "white" }}
      >
        <Flex alignItems="center">
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