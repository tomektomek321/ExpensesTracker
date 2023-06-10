import React from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import NotLoggedUserMenu from "./NotLoggedUserMenu";
import { VscAccount } from "react-icons/vsc";

type MenuWrapperProps = {};

const MenuWrapper: React.FC<MenuWrapperProps> = () => {
  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0px 6px"
        borderRadius="4px"
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
      >
        <Flex alignItems="center">
          <Flex alignItems="center">
            <Icon fontSize={24} mr={1} color="gray.400" as={VscAccount} />
          </Flex>
          <ChevronDownIcon color="gray.500" />
        </Flex>
      </MenuButton>
      <MenuList>
        <NotLoggedUserMenu />
      </MenuList>
    </Menu>
  );
};
export default MenuWrapper;