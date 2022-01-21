import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import mutations from "../../api/mutations";
import { User } from "../../models/User";
import UserNewPasswordForm from "./UserNewPasswordForm";

function UserCurrentPassword(props: { user: User }) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const {
    handleSubmit,

    reset,
    register,
    formState: { errors },
  } = useForm();

  const checkPasswordMutation = useMutation(mutations.checkPassword, {
    onSuccess: (data) => {
      setIsDisabled(false);
      reset();
    },
    onError: () => {
      setIsDisabled(false);
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

  return (
    <>
      <Button colorScheme="blue" size="xs" onClick={onOpen}>
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
                    <Input
                      {...register("currentPassword", {
                        required: "Password is required!",
                        minLength: {
                          value: 5,
                          message: "Minimum length should be 5!",
                        },
                      })}
                      type="password"
                      placeholder="Current password"
                      autoComplete="Current password"
                    />
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
