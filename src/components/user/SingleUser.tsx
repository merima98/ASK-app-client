import { Container, Flex, Text, Box } from "@chakra-ui/react";
import { User } from "../../models/User";

function SingleUser(props: { user: User }) {
  return (
    <Container>
      <Flex
        flexDirection={{ base: "column", sm: "row" }}
        justifyContent={"space-between"}
        borderBottomColor={"red"}
        border={"1px solid"}
        borderColor={"gray.200"}
        mb={2}
        p={5}
      >
        <Flex flexDirection={"column"}>
          <Box>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              First name
            </Text>
            <Text fontSize={"sm"}>{props.user.firstName}</Text>
          </Box>
          <Box>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              Last name
            </Text>
            <Text fontSize={"sm"}>{props.user.lastName}</Text>
          </Box>
          <Box>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              Email
            </Text>
            <Text fontSize={"sm"}>{props.user.email}</Text>
          </Box>
        </Flex>
        <Flex>
          <Flex flexDirection={{ base: "column", sm: "row" }}>
            <Flex fontSize={"sm"} mr={1} fontWeight={"bold"}>
              Number of answers
            </Flex>
            <Flex fontSize={"sm"}>{props.user.answers?.length}</Flex>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
}

export default SingleUser;
