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
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toInteger } from "lodash";
import { useParams } from "react-router-dom";
import queries from "../../api/queries";
import { FieldValues, useForm } from "react-hook-form";
import { User } from "../../models/User";
import mutations from "../../api/mutations";
import { useState } from "react";
import UserCurrentPassword from "./UserCurrentPassword";

function UserDetails() {
  const queryClient = useQueryClient();
  const params = useParams();
  const userId = params.id;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [profileData, setProfileData] = useState({});

  const { data } = useQuery("user", () =>
    queries.getUserById(toInteger(userId))
  );

  const updateProfileDataMutation = useMutation(
    () => mutations.updateProfileData(toInteger(userId), profileData),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("user");
        onClose();
      },
    }
  );

  function onSubmit(values: FieldValues) {
    setProfileData(values);
    updateProfileDataMutation.mutate();
  }

  let user: User = data?.data;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  return (
    <Container
      rounded={"20px"}
      overflow={"hidden"}
      border={"3px solid"}
      borderColor={"gray.100"}
      p={"10px"}
    >
      <Flex flexDirection={"column"}>
        <Flex justifyContent={"space-between"} mb={2}>
          <Text fontSize={15} fontWeight={"bold"}>
            First name
          </Text>
          <Text>{data?.data.firstName}</Text>
        </Flex>
        <Flex justifyContent={"space-between"} mb={2}>
          <Text fontSize={15} fontWeight={"bold"}>
            First name
          </Text>
          <Text>{data?.data.lastName}</Text>
        </Flex>
        <Flex justifyContent={"space-between"} mb={2}>
          <Text fontSize={15} fontWeight={"bold"}>
            Email
          </Text>
          <Text>{data?.data.email}</Text>
        </Flex>
        <Flex justifyContent={"space-between"} mb={2}>
          <UserCurrentPassword user={user} />
          <Button colorScheme="blue" size="xs" onClick={onOpen}>
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
                  <Button type="submit" colorScheme="green" size="xs" mr={1}>
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