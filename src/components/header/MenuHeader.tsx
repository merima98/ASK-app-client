import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../../state";

function MenuHeader() {
  const isLoggedIn = useAuth((state) => state.isLoggedIn);
  const setIsLoggedIn = useAuth((state) => state.setIsLoggedIn);

  function logout() {
    setIsLoggedIn(false, "");
    window.localStorage.clear();
  }

  return (
    <Box display={{ base: "block", sm: "none" }}>
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
            <MenuItem fontSize={12}>
              <Link to="/">Home</Link>
            </MenuItem>
            <MenuItem fontSize={12}>
              <Link to="/">Questions</Link>
            </MenuItem>
            <MenuItem fontSize={12}>
              <Link to="/">My questions</Link>
            </MenuItem>
            <MenuItem fontSize={12}>
              <Link to="/">Profile</Link>
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
            <MenuItem fontSize={12}>
              <Link to="/questions">Questions</Link>
            </MenuItem>
            <MenuItem fontSize={12}>
              <Link to="/login">Login</Link>
            </MenuItem>
            <MenuItem fontSize={12}>
              <Link to="/">Register</Link>
            </MenuItem>
          </MenuList>
        )}
      </Menu>
    </Box>
  );
}
export default MenuHeader;
