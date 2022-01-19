import { Box, Button, Center, Container } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import queries from "../../api/queries";
import { Question } from "../../models/Question";
import { useAuth } from "../../state";
import HomeHeader from "../header/HomeHeader";
import NewQuestion from "../question/NewQuestion";
import SingleQuestion from "../question/SingleQuestion";

function Home() {
  const defaultPageSize = 20;
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [isButtonVisible, setButtonVisible] = useState(true);
  const [questions, setQuestions] = useState([]);
  const isLoggedIn = useAuth((state) => state.isLoggedIn);

  useEffect(() => {
    async function loadPaginatedQuestions() {
      let response = await queries.paginatedQuestions(pageSize);
      setQuestions(response.data);
      if (!(pageSize <= response.data.length)) {
        setButtonVisible(false);
      }
      setPageSize(pageSize);
    }
    loadPaginatedQuestions();
  }, [pageSize]);

  function loadMoreQuestions() {
    let newPageSize = pageSize;
    newPageSize += defaultPageSize;
    setPageSize(newPageSize);
  }

  return (
    <Container>
      <HomeHeader />
      <Container
        rounded={"20px"}
        overflow={"hidden"}
        border={"3px solid"}
        backgroundColor={"gray.50"}
        borderColor={"gray.100"}
        p={"10px"}
      >
        {isLoggedIn && <NewQuestion />}
        <Box mb={3}>
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
