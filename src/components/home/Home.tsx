import { Box, Button, Center, Container } from "@chakra-ui/react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { toInteger } from "lodash";
import { useQuery } from "react-query";

import queries from "../../api/queries";
import { Question } from "../../models/Question";
import SingleQuestion from "../question/SingleQuestion";

function Home() {
  const location = useLocation();
  const defaultPageSize = 20;
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [isButtonVisible, setButtonVisible] = useState(true);
  const loggedUserId = toInteger(window.localStorage.getItem("userId"));

  const { data } = useQuery(
    ["paginated-questions", pageSize],
    () =>
      location.pathname === "/new-questions"
        ? queries.paginatedQuestions(pageSize)
        : queries.getUserQuestions(pageSize, loggedUserId),
    { keepPreviousData: true }
  );

  const questions = data?.data;

  function loadMoreQuestions() {
    if (pageSize <= questions?.length) {
      let newPageSize = pageSize;
      newPageSize += defaultPageSize;
      setPageSize(newPageSize);
    } else {
      setButtonVisible(false);
    }
  }

  return (
    <Container>
      <Container p={10}>
        <Box mb={3}>
          {questions?.map((question: Question) => {
            return (
              <SingleQuestion
                key={question.id}
                content={question.content}
                dateOfCreation={question.dateOfCreation}
                dislikes={question.dislikes}
                id={question.id}
                likes={question.likes}
                user={question.user}
                userId={question.userId}
              />
            );
          })}
        </Box>
        {isButtonVisible && (
          <Center>
            <Button
              mb={3}
              colorScheme="blue"
              size="xs"
              onClick={loadMoreQuestions}
            >
              Load more
            </Button>
          </Center>
        )}
      </Container>
    </Container>
  );
}

export default Home;
