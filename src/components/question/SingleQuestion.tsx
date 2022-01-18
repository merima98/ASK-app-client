import { Box, Button, Center, Flex } from "@chakra-ui/react";
import { format } from "date-fns";

import { Question } from "../../models/Question";

function SingleQuestion(props: Question) {
  const { content, dateOfCreation, dislikes, id, likes, user, userId } = props;

  function convertDate(date: string) {
    let dateParse = Date.parse(date);
    let value = format(dateParse, "dd.MM.yyyy");
    return value;
  }
  return (
    <Center>
      <Flex
        flexDirection={"column"}
        padding={"1rem"}
        borderBottom={"3px solid"}
        borderColor={"gray.200"}
      >
        <Box fontSize={"0.85rem"}>{convertDate(dateOfCreation)}</Box>
        <Box fontSize={"0.85rem"} mb={"0.5rem"}>
          {user.firstName} {user.lastName}
        </Box>
        <Box fontSize={"1.5rem"} mb={"0.5rem"}>
          {content}
        </Box>
        <Flex
          justifyContent={"space-between"}
          fontSize={"0.85rem"}
          mb={"0.5rem"}
        >
          <Box>{likes} likes</Box>
          <Box>{dislikes} dislikes</Box>
        </Flex>
        <Flex justifyContent={"space-between"} fontSize={"0.85rem"}>
          <Button colorScheme="teal" size="xs">
            Like
          </Button>
          <Button colorScheme="teal" size="xs">
            Dislike
          </Button>
        </Flex>
      </Flex>
    </Center>
  );
}

export default SingleQuestion;
