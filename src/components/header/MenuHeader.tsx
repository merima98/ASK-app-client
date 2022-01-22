import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { toInteger } from "lodash";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { Link, useLocation } from "react-router-dom";

import { useAuth } from "../../state";

function MenuHeader() {
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation();
  const isLoggedIn = useAuth((state) => state.isLoggedIn);
  const setIsLoggedIn = useAuth((state) => state.setIsLoggedIn);
  const loggedUserId = toInteger(window.localStorage.getItem("userId"));

  function logout() {
    setIsLoggedIn(false, "");
    window.localStorage.clear();
  }

  const linkColor = useColorModeValue("black", "white");
  const activeLinkColor = useColorModeValue("blue", "orange");
  const buttonHoverColor = useColorModeValue("gray.100", "gray.700");
  const buttonBackgroundColor = useColorModeValue("white", "gray.800");

  return (
    <Box
      display={{ base: "block", sm: "none" }}
      position={"fixed"}
      top={0}
      zIndex={2}
    >
      <Menu>
        <MenuButton
          px={4}
          py={2}
          mb={2}
          transition="all 0.2s"
          fontSize={12}
          borderRadius="md"
          bg={buttonBackgroundColor}
          borderWidth="1px"
          _hover={{ bg: buttonHoverColor }}
        >
          ASK <ChevronDownIcon />
        </MenuButton>
        {isLoggedIn && (
          <MenuList zIndex={2}>
            <MenuItem
              fontSize={12}
              color={
                location.pathname === "/new-questions"
                  ? activeLinkColor
                  : linkColor
              }
            >
              <Link to="/new-questions">Home</Link>
            </MenuItem>
            <MenuItem
              fontSize={12}
              color={location.pathname === "/" ? activeLinkColor : linkColor}
            >
              <Link to="/">Questions</Link>
            </MenuItem>
            <MenuItem
              fontSize={12}
              color={
                location.pathname === "/my-questions"
                  ? activeLinkColor
                  : linkColor
              }
            >
              <Link to="/my-questions">My questions</Link>
            </MenuItem>
            <MenuItem fontSize={12}>
              <Link to={`/user/${loggedUserId}`}>Profile</Link>
            </MenuItem>
            <MenuItem fontSize={12}>
              <Link to="/" onClick={logout}>
                Logout
              </Link>
            </MenuItem>
            <MenuItem fontSize={12}>
              {colorMode === "light" ? (
                <SunIcon onClick={toggleColorMode} />
              ) : (
                <MoonIcon onClick={toggleColorMode} />
              )}
            </MenuItem>
          </MenuList>
        )}
        {!isLoggedIn && (
          <MenuList zIndex={2}>
            <MenuItem
              fontSize={12}
              color={
                location.pathname === "/new-questions"
                  ? activeLinkColor
                  : linkColor
              }
            >
              <Link to="/new-questions">Home</Link>
            </MenuItem>
            <MenuItem
              fontSize={12}
              color={
                location.pathname === "/questions" ? activeLinkColor : linkColor
              }
            >
              <Link to="/questions">Questions</Link>
            </MenuItem>
            <MenuItem
              fontSize={12}
              color={
                location.pathname === "/login" ? activeLinkColor : linkColor
              }
            >
              <Link to="/login">Login</Link>
            </MenuItem>
            <MenuItem
              fontSize={12}
              color={
                location.pathname === "/register" ? activeLinkColor : linkColor
              }
            >
              <Link to="/">Register</Link>
            </MenuItem>
            <MenuItem fontSize={12}>
              {colorMode === "light" ? (
                <SunIcon onClick={toggleColorMode} />
              ) : (
                <MoonIcon onClick={toggleColorMode} />
              )}
            </MenuItem>
          </MenuList>
        )}
      </Menu>
    </Box>
  );
}
export default MenuHeader;
