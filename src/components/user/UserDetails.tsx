import { toInteger } from "lodash";
import { Button, Text, Container, Flex } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import queries from "../../api/queries";

function UserDetails() {
  const params = useParams();
  const userId = params.id;

  const { data } = useQuery("user", () =>
    queries.getUserById(toInteger(userId))
  );

  return (
    <Container
      rounded={"20px"}
      overflow={"hidden"}
      border={"3px solid"}
      borderColor={"gray.100"}
      p={"10px"}
    >
      <Flex flexDirection={"column"}>
        <Flex justifyContent={"space-between"} mb={2}>
          <Text fontSize={15} fontWeight={"bold"}>
            First name
          </Text>
          <Text>{data?.data.firstName}</Text>
        </Flex>
        <Flex justifyContent={"space-between"} mb={2}>
          <Text fontSize={15} fontWeight={"bold"}>
            First name
          </Text>
          <Text>{data?.data.lastName}</Text>
        </Flex>

        <Flex justifyContent={"space-between"} mb={2}>
          <Text fontSize={15} fontWeight={"bold"}>
            Email
          </Text>
          <Text>{data?.data.email}</Text>
        </Flex>
        <Flex justifyContent={"space-between"} mb={2}>
          <Button colorScheme="blue" size="xs">
            Change password
          </Button>
          <Button colorScheme="blue" size="xs">
            Change profile data
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
}

export default UserDetails;
