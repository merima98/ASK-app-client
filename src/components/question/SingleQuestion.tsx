import { Box, Button, Center, Flex, Tooltip } from "@chakra-ui/react";
import { format } from "date-fns";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

import mutations from "../../api/mutations";
import { Question } from "../../models/Question";
import { useAuth } from "../../state";

function SingleQuestion(props: Question) {
  const navigate = useNavigate();
  const isLoggedIn = useAuth((state) => state.isLoggedIn);
  const queryClient = useQueryClient();
  const { content, dateOfCreation, dislikes, id, likes, user, userId } = props;

  function convertDate(date?: string) {
    if (date) {
      let dateParse = Date.parse(date);
      let value = format(dateParse, "dd.MM.yyyy");
      return value;
    }
  }

  const likeQuestionMutation = useMutation(
    () => mutations.likeQuestion(id, likes + 1),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("questions-list");
      },
    }
  );

  const dislikeQuestionMutation = useMutation(
    () => mutations.dislikeQuestion(id, dislikes + 1),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("questions-list");
      },
    }
  );

  function likeQuestion() {
    likeQuestionMutation.mutate();
  }

  function dislikeQuestion() {
    dislikeQuestionMutation.mutate();
  }

  function navigateToDetails() {
    navigate(`/questions/${id}`);
  }
  return (
    <Center>
      <Flex
        w={"50%"}
        flexDirection={"column"}
        padding={"1rem"}
        borderBottom={"3px solid"}
        borderColor={"gray.200"}
      >
        <Box fontSize={"0.85rem"}>{convertDate(dateOfCreation)}</Box>
        <Box fontSize={"0.85rem"} mb={"0.5rem"}>
          {user?.firstName} {user.lastName}
        </Box>
        <Tooltip label={"Click here to see details."}>
          <Box
            fontSize={"1.5rem"}
            mb={"0.5rem"}
            cursor={"pointer"}
            onClick={navigateToDetails}
          >
            {content}
          </Box>
        </Tooltip>
        <Flex
          justifyContent={"space-between"}
          fontSize={"0.85rem"}
          mb={"0.5rem"}
        >
          <Box>{likes} likes</Box>
          <Box>{dislikes} dislikes</Box>
        </Flex>

        {isLoggedIn && (
          <Flex justifyContent={"space-between"} fontSize={"0.85rem"}>
            <Button colorScheme="teal" size="xs" onClick={likeQuestion}>
              Like
            </Button>
            <Button colorScheme="teal" size="xs" onClick={dislikeQuestion}>
              Dislike
            </Button>
          </Flex>
        )}
      </Flex>
    </Center>
  );
}

export default SingleQuestion;
