import { Box, Button, Center, Container } from "@chakra-ui/react";
import { useState } from "react";
import queries from "../../api/queries";
import { useLocation } from "react-router-dom";
import { Question } from "../../models/Question";
import { toInteger } from "lodash";
import HomeHeader from "../header/HomeHeader";
import SingleQuestion from "../question/SingleQuestion";
import { useQuery } from "react-query";

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
      <HomeHeader />
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
