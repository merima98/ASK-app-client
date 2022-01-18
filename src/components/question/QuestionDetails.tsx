import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toInteger } from "lodash";
import { format } from "date-fns";

import queries from "../../api/queries";
import { Box, Button, Center, Container, Flex } from "@chakra-ui/react";
import { Question } from "../../models/Question";
import NewAnswer from "../answer/NewAnswer";
import { Answer } from "../../models/Answer";
import SingleAnswer from "../answer/SingleAnswer";

function QuestionDetails() {
  const params = useParams();

  const { data } = useQuery("question", () =>
    queries.getQuestionById(toInteger(params.id))
  );

  const question: Question = data?.data;

  function convertDate(date?: string) {
    if (date) {
      let dateParse = Date.parse(date);
      let value = format(dateParse, "dd.MM.yyyy");
      return value;
    }
  }

  return (
    <Container
      rounded={"20px"}
      overflow={"hidden"}
      border={"3px solid"}
      backgroundColor={"gray.50"}
      borderColor={"gray.100"}
      p={"10px"}
    >
      <Center flexDirection={"column"}>
        <Flex
          flexDirection={"column"}
          w={"100%"}
          padding={"1rem"}
          borderBottom={"3px solid"}
          borderColor={"gray.200"}
        >
          <Box fontSize={"0.85rem"}>
            {convertDate(question?.dateOfCreation)}
          </Box>
          <Box mb={"0.5rem"} fontSize={"0.85rem"}>
            {question?.user.firstName} {question?.user.lastName}
          </Box>
          <Box mb={"0.5rem"}>{question?.content}</Box>
          <Flex justifyContent={"space-between"}>
            <Button colorScheme="teal" size="xs">
              Edit
            </Button>
            <Button colorScheme="red" size="xs">
              Delete
            </Button>
          </Flex>
        </Flex>
        <Flex w={"100%"}>
          <NewAnswer questionId={question?.id} />
        </Flex>
        <Flex flexDirection={"column"} width={"100%"}>
          {question?.answers?.map((answer: Answer) => {
            return (
              <SingleAnswer
                key={answer.id}
                content={answer.content}
                dateOfCreation={answer.dateOfCreation}
                dislikes={answer.dislikes}
                id={answer.id}
                likes={answer.likes}
                questionId={answer.questionId}
                userId={answer.userId}
                user={answer.user}
              />
            );
          })}
        </Flex>
      </Center>
    </Container>
  );
}

export default QuestionDetails;
