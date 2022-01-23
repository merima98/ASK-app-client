import {
  Box,
  Button,
  Center,
  Container,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { toInteger } from "lodash";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

import queries from "../../api/queries";
import { Question } from "../../models/Question";
import SingleQuestion from "../question/SingleQuestion";

function MyQuestions() {
  const defaultPageSize = 20;
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const textColor = useColorModeValue("blue", "orange");

  const loggedUserId = toInteger(window.localStorage.getItem("userId"));

  const { data } = useQuery(
    ["my-questions", pageSize],
    () => queries.getUserQuestions(pageSize, loggedUserId),
    { keepPreviousData: true }
  );

  const questions = data?.data;

  function loadMoreQuestions() {
    let newPageSize = pageSize;
    newPageSize += defaultPageSize;
    setPageSize(newPageSize);
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
        {questions?.length ? (
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
        ) : (
          <Center p={10}>
            <Box textAlign={"center"}>
              <Text>Oops no questions yet.</Text>
              <Text textColor={textColor}>
                <Link to="/">Add new Question</Link>.
              </Text>
            </Box>
          </Center>
        )}
      </Container>
    </Container>
  );
}

export default MyQuestions;
