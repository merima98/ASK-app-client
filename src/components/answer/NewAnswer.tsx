import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { toInteger } from "lodash";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import mutations from "../../api/mutations";

function NewAnswer(props: { questionId: number }) {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const queryClient = useQueryClient();

  const newAnswerMutation = useMutation(mutations.addAnswer, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("answers-list");
      toast({
        title: `Answer added!`,
        position: "top",
        status: "success",
        isClosable: true,
      });
      reset();
    },
  });

  function onSubmit(values: FieldValues) {
    let content = values.content;
    let newAnswer: {
      content: string;
      likes: number;
      dislikes: number;
      dateOfCreation: string;
      userId: number;
      questionId: number;
    } = {
      content: content,
      likes: 0,
      dislikes: 0,
      dateOfCreation: new Date().toISOString(),
      questionId: props.questionId,
      userId: toInteger(window.localStorage.getItem("userId")?.toString()),
    };
    newAnswerMutation.mutate(newAnswer);
  }
  return (
    <Flex
      padding={5}
      backgroundColor={"gray.50"}
      w={"100%"}
      border={"1px solid"}
      borderColor={"gray.200"}
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <FormControl isInvalid={errors.content}>
          <Textarea
            mb={"0.5rem"}
            borderColor={"gray.300"}
            placeholder="Add new answer..."
            type={"text"}
            {...register("content", {
              required: "You must enter an answer!",
            })}
          />
          <FormErrorMessage mb={"1rem"}>
            {errors.content && errors.content.message}
          </FormErrorMessage>
        </FormControl>
        <Button type="submit" colorScheme="blue" size="xs">
          Add answer
        </Button>
      </form>
    </Flex>
  );
}

export default NewAnswer;
