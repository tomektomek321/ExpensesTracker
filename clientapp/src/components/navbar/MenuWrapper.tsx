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
import { useRecoilState } from "recoil";
import { authState } from "../../atoms/AuthAtom";
import { IoSparkles } from "react-icons/io5";

type MenuWrapperProps = {};

const MenuWrapper: React.FC<MenuWrapperProps> = () => {

  const [authRecoil, setAuthRecoil] = useRecoilState(authState);

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
                    {/* <Flex alignItems="center">
                      <Icon as={IoSparkles} color="brand.100" mr={1} />
                      <Text color="gray.400">1 karma</Text>
                    </Flex> */}
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
        <NotLoggedUserMenu />
      </MenuList>
    </Menu>
  );
};
export default MenuWrapper;