import {
  Box,
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

function NewQuestion() {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const queryClient = useQueryClient();

  const newQuestionMutation = useMutation(mutations.newQuestion, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("questions-list");
      toast({
        title: `Question added!`,
        position: "top",
        status: "success",
        isClosable: true,
      });
      reset();
    },
  });

  function onSubmit(values: FieldValues) {
    let content = values.content;
    let newQuestion: {
      content: string;
      likes: number;
      dislikes: number;
      dateOfCreation: string;
      userId: number;
    } = {
      content: content,
      likes: 0,
      dislikes: 0,
      dateOfCreation: new Date().toISOString(),
      userId: toInteger(window.localStorage.getItem("userId")?.toString()),
    };
    newQuestionMutation.mutate(newQuestion);
  }

  return (
    <Flex w={"100%"} mb={2}>
      <Box width={"100%"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.content}>
            <Textarea
              mb={"0.5rem"}
              borderColor={"gray.300"}
              placeholder="Add new question..."
              type={"text"}
              {...register("content", {
                required: "Question is required field!",
              })}
            />
            <FormErrorMessage mb={"1rem"}>
              {errors.content && errors.content.message}
            </FormErrorMessage>
          </FormControl>
          <Button type="submit" colorScheme="blue" size="xs">
            Add question
          </Button>
        </form>
      </Box>
    </Flex>
  );
}

export default NewQuestion;
