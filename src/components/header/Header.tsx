import {
  Breadcrumb,
  BreadcrumbItem,
  Center,
  Container,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../state";

function Header() {
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
    <Container
      maxW={"100%"}
      bg={"white"}
      border="1px"
      borderColor="gray.200"
      mb={3}
    >
      <Center>
        {isLoggedIn && (
          <Breadcrumb spacing="8px" separator={""} p={2}>
            <BreadcrumbItem>
              <Link to="/">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to="/">Questions</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to="/">My questions</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to="/">Profile</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to="/" onClick={logout}>
                Logout
              </Link>
            </BreadcrumbItem>
          </Breadcrumb>
        )}
        {!isLoggedIn && (
          <Breadcrumb spacing="8px" separator={""} p={2}>
            <BreadcrumbItem>
              <Link to="/questions">Questions</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              {(nameOfLink === "/login" || nameOfLink === "/questions") && (
                <Link to="/">Register</Link>
              )}
              {nameOfLink === "/" && <Link to="/login">Login</Link>}
            </BreadcrumbItem>
          </Breadcrumb>
        )}
      </Center>
    </Container>
  );
}
export default Header;
