import { HamburgerIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Wrap,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../state";

function MenuHeader() {
  const isLoggedIn = useAuth((state) => state.isLoggedIn);
  const setIsLoggedIn = useAuth((state) => state.setIsLoggedIn);
  const location = useLocation();
  const [nameOfLink, setNameOfLink] = useState("");

  function logout() {
    setIsLoggedIn(false, "");
    window.localStorage.clear();
  }

  useEffect(() => {
    setNameOfLink(location.pathname);
  }, [location.pathname]);

  return (
    <Wrap display={{ base: "block", sm: "none" }} mb={3}>
      <Menu>
        <MenuButton
          as={IconButton}
          icon={<HamburgerIcon />}
          variant="outline"
        />
        {isLoggedIn && (
          <MenuList maxW={"10px"} zIndex={2}>
            <MenuItem>
              <Link to="/">
                <Text fontSize={12}>Home</Text>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/">
                <Text fontSize={12}>Questions</Text>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/">
                <Text fontSize={12}>My questions</Text>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/">
                <Text fontSize={12}>Profile</Text>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/" onClick={logout}>
                <Text fontSize={12}>Logout</Text>
              </Link>
            </MenuItem>
          </MenuList>
        )}
        {!isLoggedIn && (
          <MenuList maxW={"10px"} zIndex={2}>
            <MenuItem>
              <Link to="/questions">
                <Text fontSize={12}>Questions</Text>
              </Link>
            </MenuItem>
            <MenuItem>
              {(nameOfLink === "/login" || nameOfLink === "/questions") && (
                <Link to="/">
                  <Text fontSize={12}>Register</Text>
                </Link>
              )}

              {nameOfLink === "/" && (
                <Link to="/login">
                  <Text fontSize={12}>Login</Text>
                </Link>
              )}
            </MenuItem>
          </MenuList>
        )}
      </Menu>
    </Wrap>
  );
}
export default MenuHeader;
