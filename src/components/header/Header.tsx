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
  Flex,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { User } from "react-feather";
import { toInteger } from "lodash";

import { useAuth } from "../../state";

function Header() {
  const isLoggedIn = useAuth((state) => state.isLoggedIn);
  const setIsLoggedIn = useAuth((state) => state.setIsLoggedIn);
  const loggedUserId = toInteger(window.localStorage.getItem("userId"));
  const location = useLocation();
  const isHeaderDisplyed = detectLocation();

  function detectLocation() {
    if (
      location.pathname === "/new-questions" ||
      location.pathname === "/hot-questions" ||
      location.pathname === "/popular-users"
    ) {
      return true;
    }
    return false;
  }

  function logout() {
    setIsLoggedIn(false, "");
    window.localStorage.clear();
  }

  return (
    <Container
      maxW={"100%"}
      position={"fixed"}
      zIndex={1}
      bg={"white"}
      border="1px"
      borderColor="gray.200"
      mb={3}
      display={{ base: "none", sm: "block" }}
    >
      <Center>
        {isLoggedIn && (
          <Flex flexDirection={"column"}>
            <Flex justifyContent={"center"}>
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
            </Flex>
            {isHeaderDisplyed && (
              <Flex>
                <Breadcrumb separator="-">
                  <BreadcrumbItem>
                    <Link to="/new-questions">New questions</Link>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <Link to="/popular-users">Popular users</Link>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <Link to="/hot-questions">Hot questions</Link>
                  </BreadcrumbItem>
                </Breadcrumb>
              </Flex>
            )}
          </Flex>
        )}
        {!isLoggedIn && (
          <Flex>
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
          </Flex>
        )}
      </Center>
    </Container>
  );
}
export default Header;
