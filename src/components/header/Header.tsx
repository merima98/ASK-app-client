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
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { User, Moon, Sun } from "react-feather";

import { useAuth } from "../../state";

function Header() {
  const isLoggedIn = useAuth((state) => state.isLoggedIn);
  const setLoggedOut = useAuth((state) => state.setLoggedOut);
  const loggedUserId = Number(window.localStorage.getItem("userId"));
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
    setLoggedOut(false);
  }

  const { colorMode, toggleColorMode } = useColorMode();
  const backgroundColor = useColorModeValue("white", "gray.800");
  const linkColor = useColorModeValue("black", "white");
  const activeLinkColor = useColorModeValue("blue", "orange");
  return (
    <Container
      maxW={"100%"}
      position={"fixed"}
      zIndex={2}
      bg={backgroundColor}
      top={0}
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
                <BreadcrumbItem
                  color={
                    location.pathname === "/new-questions"
                      ? activeLinkColor
                      : linkColor
                  }
                >
                  <Link to="/new-questions">Home</Link>
                </BreadcrumbItem>
                <BreadcrumbItem
                  color={
                    location.pathname === "/" ? activeLinkColor : linkColor
                  }
                >
                  <Link to="/">Questions</Link>
                </BreadcrumbItem>
                <BreadcrumbItem
                  color={
                    location.pathname === "/my-questions"
                      ? activeLinkColor
                      : linkColor
                  }
                >
                  <Link to="/my-questions">My questions</Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <Menu>
                    <MenuButton
                      transition="all 0.2s"
                      color={
                        location.pathname === `/user/${loggedUserId}`
                          ? activeLinkColor
                          : linkColor
                      }
                    >
                      <User width={20} height={16} />
                    </MenuButton>
                    <MenuList zIndex={2}>
                      <MenuItem
                        fontSize={12}
                        cursor={"default"}
                        color={
                          location.pathname === `/user/${loggedUserId}`
                            ? activeLinkColor
                            : linkColor
                        }
                      >
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
                <BreadcrumbItem>
                  {colorMode === "light" ? (
                    <Sun
                      onClick={toggleColorMode}
                      width={20}
                      height={16}
                      cursor="pointer"
                    />
                  ) : (
                    <Moon
                      onClick={toggleColorMode}
                      width={20}
                      height={16}
                      cursor="pointer"
                    />
                  )}
                </BreadcrumbItem>
              </Breadcrumb>
            </Flex>
            {isHeaderDisplyed && (
              <Flex>
                <Breadcrumb separator="-">
                  <BreadcrumbItem
                    color={
                      location.pathname === "/new-questions"
                        ? activeLinkColor
                        : linkColor
                    }
                  >
                    <Link to="/new-questions">New questions</Link>
                  </BreadcrumbItem>
                  <BreadcrumbItem
                    color={
                      location.pathname === "/popular-users"
                        ? activeLinkColor
                        : linkColor
                    }
                  >
                    <Link to="/popular-users">Popular users</Link>
                  </BreadcrumbItem>
                  <BreadcrumbItem
                    color={
                      location.pathname === "/hot-questions"
                        ? activeLinkColor
                        : linkColor
                    }
                  >
                    <Link to="/hot-questions">Hot questions</Link>
                  </BreadcrumbItem>
                </Breadcrumb>
              </Flex>
            )}
          </Flex>
        )}
        {!isLoggedIn && (
          <Flex>
            <Breadcrumb spacing="8px" p={2}>
              <BreadcrumbItem
                color={
                  location.pathname === "/new-questions"
                    ? activeLinkColor
                    : linkColor
                }
              >
                <Link to="/new-questions">Home</Link>
              </BreadcrumbItem>
              <BreadcrumbItem
                color={
                  location.pathname === "/questions"
                    ? activeLinkColor
                    : linkColor
                }
              >
                <Link to="/questions">Questions</Link>
              </BreadcrumbItem>
              <BreadcrumbItem
                color={
                  location.pathname === "/login" ? activeLinkColor : linkColor
                }
              >
                <Link to="/login">Login</Link>
              </BreadcrumbItem>
              <BreadcrumbItem
                color={location.pathname === "/" ? activeLinkColor : linkColor}
              >
                <Link to="/">Register</Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                {colorMode === "light" ? (
                  <Sun
                    onClick={toggleColorMode}
                    width={20}
                    height={16}
                    cursor="pointer"
                  />
                ) : (
                  <Moon
                    onClick={toggleColorMode}
                    width={20}
                    height={16}
                    cursor="pointer"
                  />
                )}
              </BreadcrumbItem>
            </Breadcrumb>
          </Flex>
        )}
      </Center>
    </Container>
  );
}
export default Header;
