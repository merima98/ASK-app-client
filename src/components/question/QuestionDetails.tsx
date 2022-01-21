import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toInteger } from "lodash";
import { format } from "date-fns";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { useRef, useState } from "react";

import mutations from "../../api/mutations";
import queries from "../../api/queries";
import { Question } from "../../models/Question";
import NewAnswer from "../answer/NewAnswer";
import AnswersList from "../answer/AnswersList";
import { useAuth } from "../../state";

function QuestionDetails() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const params = useParams();
  const isLoggedIn = useAuth((state) => state.isLoggedIn);
  const loggedUserId = toInteger(window.localStorage.getItem("userId"));
  const queryClient = useQueryClient();
  const [newContent, setContent] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  const updateQuestionMutation = useMutation(
    () => mutations.updateQuestion(question.id, newContent),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("question");
        onClose();
      },
    }
  );

  function onSubmit(values: FieldValues) {
    setContent(values.content);
    updateQuestionMutation.mutate();
  }

  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const onCloseAlert = () => setIsOpenAlert(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const deleteQuestionMutation = useMutation(mutations.deleteQuestion, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("questions-list");
      navigate("/");
    },
  });

  const deleteQuestion = () => {
    deleteQuestionMutation.mutate(question.id);
    setIsOpenAlert(false);
  };
  return (
    <Container paddingTop={20}>
      <Center flexDirection={"column"}>
        <Flex
          flexDirection={"column"}
          w={"100%"}
          padding={"1rem"}
          border={"1px solid"}
          borderColor={"gray.200"}
          mb={2}
        >
          <Box fontSize={"0.85rem"}>
            {convertDate(question?.dateOfCreation)}
          </Box>
          <Box mb={"0.5rem"} fontSize={"0.85rem"}>
            {question?.user.firstName} {question?.user.lastName}
          </Box>
          <Box mb={"0.5rem"}>{question?.content}</Box>

          {isLoggedIn && question?.userId === loggedUserId && (
            <Flex justifyContent={"space-between"}>
              <Button colorScheme="blue" size="xs" onClick={onOpen}>
                Edit
              </Button>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <ModalContent>
                    <ModalHeader>Update question</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={3}>
                      <FormControl isInvalid={errors.content}>
                        <Textarea
                          placeholder="Update question"
                          defaultValue={question?.content}
                          type={"text"}
                          {...register("content", {
                            required: "Question is required field!",
                          })}
                        />
                        <FormErrorMessage mb={1}>
                          {errors.content && errors.content.message}
                        </FormErrorMessage>
                      </FormControl>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        type="submit"
                        colorScheme="green"
                        size="xs"
                        mr={1}
                      >
                        Save
                      </Button>
                      <Button size="xs" onClick={onClose}>
                        Discard changes
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </form>
              </Modal>
              <Button
                colorScheme="red"
                size="xs"
                onClick={() => setIsOpenAlert(true)}
              >
                Delete
              </Button>
              <AlertDialog
                isOpen={isOpenAlert}
                onClose={onCloseAlert}
                leastDestructiveRef={cancelRef}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Delete question
                    </AlertDialogHeader>
                    <AlertDialogBody>
                      Are you sure you want to delete a question?
                    </AlertDialogBody>
                    <AlertDialogFooter>
                      <Button ref={cancelRef} size="xs" onClick={onCloseAlert}>
                        Cancel
                      </Button>
                      <Button
                        colorScheme="red"
                        size="xs"
                        onClick={deleteQuestion}
                        ml={2}
                      >
                        Delete
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </Flex>
          )}
        </Flex>
        {isLoggedIn && (
          <Flex w={"100%"}>
            <NewAnswer questionId={question?.id} />
          </Flex>
        )}
        <AnswersList />
      </Center>
    </Container>
  );
}

export default QuestionDetails;
