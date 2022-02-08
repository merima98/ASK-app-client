import {
  Button,
  Text,
  Container,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormErrorMessage,
  ModalFooter,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import queries from "../../api/queries";
import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";

import { User } from "../../models/User";
import mutations from "../../api/mutations";
import UserCurrentPassword from "./UserCurrentPassword";

function UserDetails() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const params = useParams();
  const userId = params.id;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [profileData, setProfileData] = useState({});

  const { data } = useQuery("user", () => queries.getUserById(Number(userId)));

  const updateProfileDataMutation = useMutation(
    () => mutations.updateProfileData(Number(userId), profileData),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("user");
        toast({
          title: `Profile data updated!`,
          position: "top",
          status: "success",
          isClosable: true,
        });
        onClose();
      },
    }
  );

  function onSubmit(values: FieldValues) {
    setProfileData(values);
    updateProfileDataMutation.mutate();
  }

  const user: User = data?.data;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  return (
    <Container
      border={"1px solid"}
      borderColor={"gray.200"}
      p={10}
      marginTop={20}
    >
      <Flex flexDirection={"column"}>
        <Flex
          justifyContent={"space-between"}
          mb={2}
          flexDirection={{ base: "column", sm: "row" }}
        >
          <Text fontSize={"sm"} fontWeight={"bold"}>
            First name
          </Text>
          <Text>{data?.data.firstName}</Text>
        </Flex>
        <Flex
          justifyContent={"space-between"}
          mb={2}
          flexDirection={{ base: "column", sm: "row" }}
        >
          <Text fontSize={"sm"} fontWeight={"bold"}>
            Last name
          </Text>
          <Text>{data?.data.lastName}</Text>
        </Flex>
        <Flex
          justifyContent={"space-between"}
          mb={2}
          flexDirection={{ base: "column", sm: "row" }}
        >
          <Text fontSize={"sm"} fontWeight={"bold"}>
            Email
          </Text>
          <Text>{data?.data.email}</Text>
        </Flex>
        <Flex
          justifyContent={"space-between"}
          flexDirection={{ base: "column", sm: "row" }}
          mb={2}
        >
          <UserCurrentPassword user={user} />
          <Button colorScheme="blue" size="xs" onClick={onOpen} mb={1}>
            Change profile data
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalContent>
                <ModalHeader>Update your profile</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={3}>
                  <FormControl isInvalid={errors.firstName}>
                    <Input
                      mb={1}
                      placeholder="First name"
                      defaultValue={user?.firstName}
                      type={"text"}
                      {...register("firstName", {
                        required: "First name is required field!",
                      })}
                    />
                    <FormErrorMessage mb={1}>
                      {errors.firstName && errors.firstName.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors.lastName}>
                    <Input
                      mb={1}
                      placeholder="First name"
                      defaultValue={user?.lastName}
                      type={"text"}
                      {...register("lastName", {
                        required: "Last name is required field!",
                      })}
                    />
                    <FormErrorMessage mb={1}>
                      {errors.lastName && errors.lastName.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors.email}>
                    <Input
                      mb={1}
                      placeholder="Email"
                      defaultValue={user?.email}
                      type={"email"}
                      {...register("email", {
                        required: "Email is required filed!",
                      })}
                    />
                    <FormErrorMessage mb={1}>
                      {errors.email && errors.email.message}
                    </FormErrorMessage>
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button
                    type="submit"
                    colorScheme="green"
                    size="xs"
                    mr={1}
                    isLoading={updateProfileDataMutation.isLoading}
                  >
                    Save
                  </Button>
                  <Button size="xs" onClick={onClose}>
                    Discard changes
                  </Button>
                </ModalFooter>
              </ModalContent>
            </form>
          </Modal>
        </Flex>
      </Flex>
    </Container>
  );
}

export default UserDetails;
