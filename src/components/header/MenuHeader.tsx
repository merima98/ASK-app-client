import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { toInteger } from "lodash";
import { Link, useLocation } from "react-router-dom";

import { useAuth } from "../../state";

function MenuHeader() {
  const location = useLocation();
  const isLoggedIn = useAuth((state) => state.isLoggedIn);
  const setIsLoggedIn = useAuth((state) => state.setIsLoggedIn);
  const loggedUserId = toInteger(window.localStorage.getItem("userId"));

  function logout() {
    setIsLoggedIn(false, "");
    window.localStorage.clear();
  }

  return (
    <Box display={{ base: "block", sm: "none" }} position={"fixed"} top={0}>
      <Menu>
        <MenuButton
          px={4}
          py={2}
          mb={2}
          transition="all 0.2s"
          fontSize={12}
          borderRadius="md"
          borderWidth="1px"
          _hover={{ bg: "gray.100" }}
        >
          ASK <ChevronDownIcon />
        </MenuButton>
        {isLoggedIn && (
          <MenuList zIndex={2}>
            <MenuItem
              fontSize={12}
              color={location.pathname === "/new-questions" ? "blue" : "black"}
            >
              <Link to="/new-questions">Home</Link>
            </MenuItem>
            <MenuItem
              fontSize={12}
              color={location.pathname === "/" ? "blue" : "black"}
            >
              <Link to="/">Questions</Link>
            </MenuItem>
            <MenuItem
              fontSize={12}
              color={location.pathname === "/my-questions" ? "blue" : "black"}
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
          </MenuList>
        )}
        {!isLoggedIn && (
          <MenuList zIndex={2}>
            <MenuItem
              fontSize={12}
              color={location.pathname === "/new-questions" ? "blue" : "black"}
            >
              <Link to="/new-questions">Home</Link>
            </MenuItem>
            <MenuItem
              fontSize={12}
              color={location.pathname === "/questions" ? "blue" : "black"}
            >
              <Link to="/questions">Questions</Link>
            </MenuItem>
            <MenuItem
              fontSize={12}
              color={location.pathname === "/login" ? "blue" : "black"}
            >
              <Link to="/login">Login</Link>
            </MenuItem>
            <MenuItem
              fontSize={12}
              color={location.pathname === "/register" ? "blue" : "black"}
            >
              <Link to="/">Register</Link>
            </MenuItem>
          </MenuList>
        )}
      </Menu>
    </Box>
  );
}
export default MenuHeader;
