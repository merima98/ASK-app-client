import { Container } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import queries from "../../api/queries";
import { Question } from "../../models/Question";
import { useAuth } from "../../state";
import NewQuestion from "./NewQuestion";
import SingleQuestion from "./SingleQuestion";

function QuestionsList() {
  const location = useLocation();

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
  const isLoggedIn = useAuth((state) => state.isLoggedIn);

  return (
    <Container
      rounded={"20px"}
      overflow={"hidden"}
      border={"3px solid"}
      backgroundColor={"gray.50"}
      borderColor={"gray.100"}
      p={"10px"}
    >
      {isLoggedIn && <NewQuestion />}
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
