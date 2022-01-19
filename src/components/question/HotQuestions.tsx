import { Container } from "@chakra-ui/react";
import HomeHeader from "../header/HomeHeader";
import QuestionsList from "../question/QuestionsList";

function HotQuestions() {
  return (
    <Container>
      <HomeHeader />
      <QuestionsList />
    </Container>
  );
}

export default HotQuestions;
