import { Box, Button, Flex, Tooltip } from "@chakra-ui/react";
import { format } from "date-fns";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import mutations from "../../api/mutations";

import { Answer } from "../../models/Answer";

function SingleAnswer(props: Answer) {
  const { content, dateOfCreation, dislikes, id, likes, user, userId } = props;
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  function convertDate(date?: string) {
    if (date) {
      let dateParse = Date.parse(date);
      let value = format(dateParse, "dd.MM.yyyy");
      return value;
    }
  }

  const likeAnswerMutation = useMutation(
    () => mutations.likeAnswer(id, likes + 1),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("answers-list");
      },
    }
  );
  const dislikeAnswerMutation = useMutation(
    () => mutations.dislikeAnswer(id, dislikes + 1),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("answers-list");
      },
    }
  );

  function likeAnswer() {
    likeAnswerMutation.mutate();
  }

  function dislikeAnswer() {
    dislikeAnswerMutation.mutate();
  }

  function navigateToDetails() {
    navigate(`/answer/${id}`);
  }

  return (
    <Flex
      flexDirection={"column"}
      padding={"1rem"}
      borderBottom={"3px solid"}
      borderColor={"gray.200"}
    >
      <Box fontSize={"0.85rem"}>{convertDate(dateOfCreation)}</Box>
      <Box fontSize={"0.85rem"} mb={"0.5rem"}>
        {user?.firstName} {user?.lastName}
      </Box>
      <Tooltip label={"Click here to see details."}>
        <Box
          fontSize={"1rem"}
          mb={"0.5rem"}
          onClick={navigateToDetails}
          cursor={"pointer"}
        >
          {content}
        </Box>
      </Tooltip>
      <Flex justifyContent={"space-between"} fontSize={"0.85rem"} mb={"0.5rem"}>
        <Box>{likes} likes</Box>
        <Box>{dislikes} dislikes</Box>
      </Flex>
      <Flex justifyContent={"space-between"} fontSize={"0.85rem"}>
        <Button colorScheme="teal" size="xs" onClick={likeAnswer}>
          Like
        </Button>
        <Button colorScheme="teal" size="xs" onClick={dislikeAnswer}>
          Dislike
        </Button>
      </Flex>
    </Flex>
  );
}

export default SingleAnswer;
