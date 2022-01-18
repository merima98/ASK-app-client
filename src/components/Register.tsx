import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  FormControl,
  FormControlOptions,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { ErrorOption, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

import { useAuth } from "../state";
import mutations from "../api/mutations";

function Register() {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const setIsLoggedIn = useAuth((state) => state.setIsLoggedIn);
  const toast = useToast();
  const signupMutation = useMutation(mutations.register, {
    onSuccess: (data) => {
      setIsLoggedIn(true, data.data.accessToken);
      navigate("/");
    },
    onError: (error: ErrorOption) => {
      setError("email", error, { shouldFocus: true });
      toast({
        title: `Email is already in use! Enter new email.`,
        status: "error",
        isClosable: true,
      });
    },
  });

  function onSubmit(values: FormControlOptions) {
    signupMutation.mutate(values);
  }

  return (
    <Container
      rounded={"20px"}
      overflow={"hidden"}
      border={"3px solid"}
      borderColor={"gray.100"}
      p={"10px"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FormControl isInvalid={errors.firstName}>
            <InputGroup>
              <InputLeftElement />
              <Input
                placeholder="First name"
                type={"info"}
                {...register("firstName", {
                  required: "First name is required field",
                  minLength: {
                    value: 2,
                    message: "Minimum length should be 2!",
                  },
                })}
              />
            </InputGroup>
            <FormErrorMessage mb={"1rem"}>
              {errors.firstName && errors.firstName.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.lastName}>
            <InputGroup>
              <InputLeftElement />
              <Input
                placeholder="Last name"
                type={"info"}
                {...register("lastName", {
                  required: "Last name is required field",
                  minLength: {
                    value: 2,
                    message: "Minimum length should be 2!",
                  },
                })}
              />
            </InputGroup>
            <FormErrorMessage mb={"1rem"}>
              {errors.lastName && errors.lastName.message}
            </FormErrorMessage>
          </FormControl>
          <Divider />

          <FormControl isInvalid={errors.email}>
            <InputGroup>
              <InputLeftElement children={<EmailIcon />} />
              <Input
                placeholder="Email"
                type={"email"}
                {...register("email", {
                  required: "Email is required!",
                })}
              />
            </InputGroup>
            <FormErrorMessage mb={"1rem"}>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password}>
            <InputGroup>
              <InputLeftElement children={<LockIcon />} />
              <Input
                placeholder="Password"
                autoComplete="Passowrd"
                type={"password"}
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
          <Button type="submit" boxShadow={"sm"} _hover={{ boxShadow: "md" }}>
            Register
          </Button>
          <Divider />
          <Center>
            <Box>
              Already have an account? <Link to="/login">Login</Link>
            </Box>
          </Center>
        </Stack>
      </form>
    </Container>
  );
}

export default Register;
