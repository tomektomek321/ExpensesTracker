import React from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from "@chakra-ui/react";
import NotLoggedUserMenu from "./NotLoggedUserMenu";
import { VscAccount } from "react-icons/vsc";
import { useRecoilValue } from "recoil";
import { authState } from "../../atoms/AuthAtom";
import LoggedUserMenu from "./LoggedUserMenu";

type MenuWrapperProps = {};

const MenuWrapper: React.FC<MenuWrapperProps> = () => {

  const authRecoil = useRecoilValue(authState);

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
            {authRecoil.logged ? (
                <>
                  <Icon
                    fontSize={24}
                    mr={1}
                    color="gray.300"
                    as={VscAccount}
                  />
                  <Box
                    display={{ base: "none", lg: "flex" }}
                    flexDirection="column"
                    fontSize="8pt"
                    alignItems="flex-start"
                    mr={8}
                  >
                    <Text fontWeight={700} pl={2}>
                      {authRecoil?.displayName}
                    </Text>
                  </Box>
                </>
              ) : (
                <Icon fontSize={24} mr={1} color="gray.400" as={VscAccount} />
              )}
          </Flex>
          <ChevronDownIcon color="gray.500" />
        </Flex>
      </MenuButton>
      <MenuList>
        {
          authRecoil.logged ? (
            <LoggedUserMenu />
          ) : (
            <NotLoggedUserMenu />
          ) 
        }
        
      </MenuList>
    </Menu>
  );
};
export default MenuWrapper;