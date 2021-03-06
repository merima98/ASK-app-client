import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  useColorModeValue,
  FormControl,
  FormControlOptions,
  InputRightElement,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import { Mail, Lock, Eye, EyeOff, ChevronRight } from "react-feather";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { ErrorOption, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

import { useAuth } from "../state";
import mutations from "../api/mutations";
import { useState } from "react";

function Register() {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm();

  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const setIsLoggedIn = useAuth((state) => state.setIsLoggedIn);
  const toast = useToast();
  const iconColor = useColorModeValue("black", "orange");
  const signupMutation = useMutation(mutations.register, {
    onSuccess: (data) => {
      setIsLoggedIn(true, data.data.user.id, data.data.accessToken);
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
  function handleClick() {
    setShow(!show);
  }

  return (
    <Container border="1px" borderColor="gray.200" p={10} marginTop={20}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FormControl isInvalid={errors.firstName}>
            <InputGroup>
              <InputLeftElement
                zIndex={-1}
                children={
                  <ChevronRight color={iconColor} width={20} height={16} />
                }
              />
              <Input
                data-cy="input-firstName"
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
              <InputLeftElement
                zIndex={-1}
                children={
                  <ChevronRight color={iconColor} width={20} height={16} />
                }
              />
              <Input
                data-cy="input-lastName"
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
              <InputLeftElement
                zIndex={1}
                children={<Mail color={iconColor} width={20} height={16} />}
              />
              <Input
                data-cy="input-email"
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
              <InputLeftElement
                zIndex={1}
                children={<Lock color={iconColor} width={20} height={16} />}
              />
              <Input
                data-cy="input-password"
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
                <Button size="sm" onClick={handleClick}>
                  {show ? (
                    <EyeOff color={iconColor} width={20} height={16} />
                  ) : (
                    <Eye color={iconColor} width={20} height={16} />
                  )}
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
            data-cy="register-button"
            isLoading={signupMutation.isLoading}
          >
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
