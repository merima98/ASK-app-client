import { Container, Flex } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";

import queries from "../../api/queries";
import { Question } from "../../models/Question";
import { useAuth } from "../../state";
import NewQuestion from "./NewQuestion";
import SingleQuestion from "./SingleQuestion";

function QuestionsList() {
  const location = useLocation();
  const isLoggedIn = useAuth((state) => state.isLoggedIn);

  function detectLocation() {
    if (location.pathname === "/questions" || location.pathname === "/") {
      return queries.questions();
    }
    if (location.pathname === "/hot-questions") {
      return queries.getHotQuestions();
    }
  }

  const { data } = useQuery("questions-list", () => detectLocation());
  const questions = data ? data?.data : [];
  return (
    <Container p={10}>
      {location.pathname === "/" && isLoggedIn && (
        <Flex>
          <NewQuestion />
        </Flex>
      )}
      {questions.map((question: Question) => {
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
    </Container>
  );
}

export default QuestionsList;
