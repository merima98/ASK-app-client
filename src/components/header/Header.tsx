import {
  Breadcrumb,
  BreadcrumbItem,
  Center,
  Container,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../../state";

function Header() {
  const isLoggedIn = useAuth((state) => state.isLoggedIn);
  const setIsLoggedIn = useAuth((state) => state.setIsLoggedIn);

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
              <Link to="/home">Home</Link>
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
              <Link to="/home">Home</Link>
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
