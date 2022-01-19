import {
  Breadcrumb,
  BreadcrumbItem,
  Center,
  Container,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Container>
      <Center>
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
      </Center>
    </Container>
  );
}

export default Home;
