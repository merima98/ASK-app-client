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
import { Answer } from "../../models/Answer";

function AnswerDetails() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const params = useParams();
  const queryClient = useQueryClient();
  const [newContent, setContent] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useQuery("answer", () =>
    queries.getAnswerById(toInteger(params.id))
  );
  const answer: Answer = data?.data;

  function convertDate(date?: string) {
    if (date) {
      let dateParse = Date.parse(date);
      let value = format(dateParse, "dd.MM.yyyy");
      return value;
    }
  }

  const updateAnswerMutation = useMutation(
    () => mutations.updateAnswer(answer.id, newContent),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("answer");
        onClose();
      },
    }
  );

  function onSubmit(values: FieldValues) {
    setContent(values.content);
    updateAnswerMutation.mutate();
  }

  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const onCloseAlert = () => setIsOpenAlert(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const deleteAnswerMutation = useMutation(mutations.deleteAnswer, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("answers-list");
      navigate(`/questions/${answer.questionId}`);
    },
  });

  const deleteAnswer = () => {
    deleteAnswerMutation.mutate(answer.id);
    setIsOpenAlert(false);
  };
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
        <Flex flexDirection={"column"} w={"100%"} padding={"1rem"}>
          <Box fontSize={"0.85rem"}>{convertDate(answer?.dateOfCreation)}</Box>
          <Box mb={"0.5rem"} fontSize={"0.85rem"}>
            {answer?.user.firstName} {answer?.user.lastName}
          </Box>
          <Box mb={"0.5rem"}>{answer?.content}</Box>
          <Flex justifyContent={"space-between"}>
            <Button colorScheme="blue" size="xs" onClick={onOpen}>
              Edit
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalContent>
                  <ModalHeader>Update answer</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={3}>
                    <FormControl isInvalid={errors.content}>
                      <Textarea
                        placeholder="Update answer"
                        defaultValue={answer?.content}
                        type={"text"}
                        {...register("content", {
                          required: "Answer is required field!",
                        })}
                      />
                      <FormErrorMessage mb={1}>
                        {errors.content && errors.content.message}
                      </FormErrorMessage>
                    </FormControl>
                  </ModalBody>
                  <ModalFooter>
                    <Button type="submit" colorScheme="green" size="xs" mr={1}>
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
                    Delete answer
                  </AlertDialogHeader>
                  <AlertDialogBody>
                    Are you sure you want to delete a answer?
                  </AlertDialogBody>
                  <AlertDialogFooter>
                    <Button ref={cancelRef} size="xs" onClick={onCloseAlert}>
                      Cancel
                    </Button>
                    <Button
                      colorScheme="red"
                      size="xs"
                      onClick={deleteAnswer}
                      ml={2}
                    >
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </Flex>
        </Flex>
      </Center>
    </Container>
  );
}

export default AnswerDetails;
