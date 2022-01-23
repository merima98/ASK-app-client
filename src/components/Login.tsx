import { Mail, Lock } from "react-feather";
import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  InputRightElement,
  FormControl,
  FormControlOptions,
  FormErrorMessage,
  Input,
  InputGroup,
  useColorModeValue,
  InputLeftElement,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
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
  const [show, setShow] = useState(false);
  const setIsLoggedIn = useAuth((state) => state.setIsLoggedIn);
  const iconColor = useColorModeValue("black", "orange");
  const inputBackgroundColor = useColorModeValue("white", "gray.700");

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
        position: "top",
        isClosable: true,
      });
    },
  });

  function onSubmit(values: FormControlOptions) {
    loginMutation.mutate(values);
  }

  const handleClick = () => setShow(!show);
  return (
    <Container border="1px" borderColor="gray.200" p={10} marginTop={20}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FormControl isInvalid={errors.email}>
            <InputGroup>
              <InputLeftElement
                zIndex={1}
                children={<Mail color={iconColor} width={20} height={16} />}
              />
              <Input
                data-cy="input-email"
                placeholder="Email"
                type={"email"}
                _focus={{ backgroundColor: inputBackgroundColor }}
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
              <InputLeftElement
                zIndex={1}
                children={<Lock color={iconColor} width={20} height={16} />}
              />
              <Input
                data-cy="input-password"
                _focus={{ backgroundColor: inputBackgroundColor }}
                placeholder="Password"
                autoComplete="Passowrd"
                type={show ? "text" : "password"}
                {...register("password", {
                  required: "Password is required!",
                  minLength: {
                    value: 5,
                    message: "Minimum length should be 5!",
                  },
                })}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={handleClick}
                  colorScheme={"blue"}
                >
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage mb={"1rem"}>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            type="submit"
            boxShadow={"sm"}
            _hover={{ boxShadow: "md" }}
            data-cy="login-button"
          >
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
