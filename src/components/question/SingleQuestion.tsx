import { Box, Button, Center, Flex, Tooltip } from "@chakra-ui/react";
import { format } from "date-fns";
import { useMutation, useQueryClient } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";

import mutations from "../../api/mutations";
import { Question } from "../../models/Question";
import { useAuth } from "../../state";

function SingleQuestion(props: Question) {
  const location = useLocation();

  function checkQueryName() {
    if (location.pathname === "/" || location.pathname === "/hot-questions") {
      return "questions-list";
    }
    if (location.pathname === "/new-questions") {
      return "paginated-questions";
    }

    if (location.pathname === "/my-questions") {
      return "my-questions";
    }
    return location.pathname;
  }
  const queryName = checkQueryName();
  const navigate = useNavigate();
  const isLoggedIn = useAuth((state) => state.isLoggedIn);
  const queryClient = useQueryClient();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        queryClient.invalidateQueries(queryName);
      },
    }
  );

  const dislikeQuestionMutation = useMutation(
    () => mutations.dislikeQuestion(id, dislikes + 1),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(queryName);
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
    <Center marginTop={10}>
      <Flex
        flexDirection={"column"}
        p={5}
        border={"1px solid"}
        borderColor={"gray.200"}
        mb={2}
        width={"100%"}
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
            <Button
              colorScheme="blue"
              size="xs"
              onClick={likeQuestion}
              zIndex={1}
            >
              Like
            </Button>
            <Button
              colorScheme="red"
              size="xs"
              onClick={dislikeQuestion}
              zIndex={1}
            >
              Dislike
            </Button>
          </Flex>
        )}
      </Flex>
    </Center>
  );
}

export default SingleQuestion;
