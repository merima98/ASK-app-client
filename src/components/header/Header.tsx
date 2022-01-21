import {
  Breadcrumb,
  BreadcrumbItem,
  Center,
  Container,
  Menu,
  MenuButton,
  MenuItem,
  Text,
  MenuList,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { User } from "react-feather";
import { toInteger } from "lodash";

import { useAuth } from "../../state";

function Header() {
  const isLoggedIn = useAuth((state) => state.isLoggedIn);
  const setIsLoggedIn = useAuth((state) => state.setIsLoggedIn);
  const loggedUserId = toInteger(window.localStorage.getItem("userId"));

  function logout() {
    setIsLoggedIn(false, "");
    window.localStorage.clear();
  }

  return (
    <Container
      maxW={"100%"}
      bg={"white"}
      border="1px"
      borderColor="gray.200"
      mb={3}
      display={{ base: "none", sm: "block" }}
    >
      <Center>
        {isLoggedIn && (
          <Breadcrumb spacing="8px" separator={""} p={2}>
            <BreadcrumbItem>
              <Link to="/new-questions">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to="/">Questions</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to="/my-questions">My questions</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Menu>
                <MenuButton transition="all 0.2s">
                  <User width={20} height={16} />
                </MenuButton>
                <MenuList zIndex={2}>
                  <MenuItem fontSize={12} cursor={"default"}>
                    <Link to={`/user/${loggedUserId}`}>
                      <Text>Your profile</Text>
                    </Link>
                  </MenuItem>
                  <MenuItem fontSize={12} cursor={"default"}>
                    <Link to="/" onClick={logout}>
                      Logout
                    </Link>
                  </MenuItem>
                </MenuList>
              </Menu>
            </BreadcrumbItem>
          </Breadcrumb>
        )}
        {!isLoggedIn && (
          <Breadcrumb spacing="8px" separator={""} p={2}>
            <BreadcrumbItem>
              <Link to="/new-questions">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to="/questions">Questions</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to="/login">Login</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to="/">Register</Link>
            </BreadcrumbItem>
          </Breadcrumb>
        )}
      </Center>
    </Container>
  );
}
export default Header;
