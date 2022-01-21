import { EmailIcon, LockIcon } from "@chakra-ui/icons";
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
  useToast,
} from "@chakra-ui/react";
import { ErrorOption, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";

import mutations from "../api/mutations";
import { useAuth } from "../state";

function Login() {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const toast = useToast();

  const setIsLoggedIn = useAuth((state) => state.setIsLoggedIn);

  const loginMutation = useMutation(mutations.login, {
    onSuccess: (data) => {
      setIsLoggedIn(true, data.data.accessToken);
      window.localStorage.setItem("userId", data.data.user.id);
      navigate("/");
    },
    onError: (error: ErrorOption) => {
      setError("email", error, { shouldFocus: true });
      setError("password", error, { shouldFocus: true });
      toast({
        title: `Email or password is incorrect!`,
        status: "error",
        isClosable: true,
      });
    },
  });

  function onSubmit(values: FormControlOptions) {
    loginMutation.mutate(values);
  }

  return (
    <Container border="1px" borderColor="gray.200" p={10} marginTop={20}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FormControl isInvalid={errors.email}>
            <InputGroup>
              <InputLeftElement zIndex={1} children={<EmailIcon />} />
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
              <InputLeftElement zIndex={1} children={<LockIcon />} />
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
            Login
          </Button>
          <Divider />
          <Center>
            <Box>
              Do not have an account? <Link to="/">Register</Link>
            </Box>
          </Center>
        </Stack>
      </form>
    </Container>
  );
}

export default Login;
