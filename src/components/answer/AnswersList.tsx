import { Flex, Text } from "@chakra-ui/react";
import { toInteger } from "lodash";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import queries from "../../api/queries";
import { Answer } from "../../models/Answer";
import SingleAnswer from "./SingleAnswer";

function AnswersList() {
  const params = useParams();
  const number = params.id;

  const { data } = useQuery("answers-list", () =>
    queries.getAnswersByQuestionById(toInteger(number))
  );
  const answers = data && data?.data;

  return (
    <Flex flexDirection={"column"} width={"100%"}>
      {answers?.length > 0 && (
        <Text p={2} fontSize={12} fontWeight={"bold"}>
          Answers
        </Text>
      )}
      {answers?.map((answer: Answer) => {
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
  );
}

export default AnswersList;
