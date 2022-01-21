import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
  InputGroup,
} from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import mutations from "../../api/mutations";
import { User } from "../../models/User";

function UserNewPasswordForm(props: { isDisabled: boolean; user: User }) {
  const toast = useToast();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const changePasswordMutation = useMutation(mutations.changePassword, {
    onSuccess: (data) => {
      toast({
        title: `Password updated!`,
        position: "top",
        status: "success",
        isClosable: true,
      });
      reset();
    },
  });

  function onSubmit(values: FieldValues) {
    let pass: string = values.password;
    let data = {
      userId: props.user.id,
      email: props.user.email,
      password: pass,
    };
    changePasswordMutation.mutate(data);
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.password} mb={2}>
          <FormLabel>New password</FormLabel>
          <InputGroup>
            <Input
              isDisabled={props.isDisabled}
              type="password"
              autoComplete="New password"
              placeholder="New password"
              {...register("password", {
                required: "Password is required!",
                minLength: {
                  value: 5,
                  message: "Minimum length should be 5!",
                },
              })}
            />
          </InputGroup>
          <FormErrorMessage mb={"1rem"}>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <Button type="submit" colorScheme="blue" size="xs">
          Confirm
        </Button>
      </form>
    </Box>
  );
}

export default UserNewPasswordForm;
