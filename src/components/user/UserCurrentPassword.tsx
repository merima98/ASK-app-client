import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  InputRightElement,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  InputGroup,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "react-query";

import mutations from "../../api/mutations";
import { User } from "../../models/User";
import { useAuth } from "../../state";
import UserNewPasswordForm from "./UserNewPasswordForm";

function UserCurrentPassword(props: { user: User }) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();
  let token = localStorage.getItem("token");
  const [show, setShow] = useState(false);
  const setIsLoggedIn = useAuth((state) => state.setIsLoggedIn);

  const checkPasswordMutation = useMutation(mutations.checkPassword, {
    onSuccess: (data) => {
      setIsDisabled(false);
      reset();
    },
    onError: () => {
      if (token) {
        setIsLoggedIn(true, token);
      }
      toast({
        title: `Incorrect password!`,
        position: "top",
        status: "error",
        isClosable: true,
      });
      setIsDisabled(true);
    },
  });

  function onClose() {
    setIsOpen(false);
    setIsDisabled(true);
  }

  function onOpen() {
    setIsOpen(true);
  }
  function onSubmit(values: FieldValues) {
    let request = {
      currentPassword: values.currentPassword,
      hash: props.user.password,
    };
    checkPasswordMutation.mutate(request);
  }
  const handleClick = () => setShow(!show);

  return (
    <>
      <Button colorScheme="blue" size="xs" onClick={onOpen} mb={1}>
        Update password
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Update password</DrawerHeader>
          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormControl isInvalid={errors.currentPassword} mb={2}>
                    <FormLabel>Current password</FormLabel>
                    <InputGroup>
                      <Input
                        {...register("currentPassword", {
                          required: "Password is required!",
                          minLength: {
                            value: 5,
                            message: "Minimum length should be 5!",
                          },
                        })}
                        type={show ? "text" : "password"}
                        placeholder="Current password"
                        autoComplete="Current password"
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
                      {errors.currentPassword && errors.currentPassword.message}
                    </FormErrorMessage>
                  </FormControl>
                  <Button type="submit" colorScheme="blue" size="xs">
                    Confirm
                  </Button>
                </form>
              </Box>
              <UserNewPasswordForm isDisabled={isDisabled} user={props.user} />
            </Stack>
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px">
            <Button colorScheme="blue" size="xs" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export default UserCurrentPassword;
