import React from "react";
import { Flex, Icon, MenuDivider, MenuItem } from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin } from "react-icons/md";
import { Link } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";
import { useSetRecoilState } from "recoil";
import { authState } from "../../atoms/AuthAtom";
import { RecoilSignOut } from "../../atoms/auth-atom-utils";
import { AuthGateway } from "../../domains/auth/auth-gateway";

type LoggedUserMenuProps = {};

const LoggedUserMenu: React.FC<LoggedUserMenuProps> = () => {

  const setAuthRecoil = useSetRecoilState(authState);

  const logout = async () => {
    RecoilSignOut(setAuthRecoil);
    AuthGateway.logOut();
  }

  return (
    <>
      <MenuItem
        fontSize="10pt"
        fontWeight={700}
        _hover={{ bg: "blue.500", color: "white" }}
      >
        <Flex alignItems="center">
          <Icon fontSize={20} mr={2} as={CgProfile} />
          <Link to={'profile'}>
            Profile
          </Link>
        </Flex>
      </MenuItem>
      <MenuItem
        fontSize="10pt"
        fontWeight={700}
        _hover={{ bg: "blue.500", color: "white" }}
      >
        <Flex alignItems="center">
          <AddIcon  fontSize={17} mr={2}/>
          <Link to={'category/create'}>
            Create Category
          </Link>
        </Flex>
      </MenuItem>
      <MenuDivider />
      <MenuItem
        fontSize="10pt"
        fontWeight={700}
        _hover={{ bg: "blue.500", color: "white" }}
        onClick={logout}
      >
        <Flex alignItems="center">
          <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
          Log Out
        </Flex>
      </MenuItem>
    </>
  );
};
export default LoggedUserMenu;