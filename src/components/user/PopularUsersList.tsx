import { Container } from "@chakra-ui/react";
import { useQuery } from "react-query";
import queries from "../../api/queries";
import { User } from "../../models/User";
import SingleUser from "./SingleUser";

function PopularUsersList() {
  const { data } = useQuery("popular-users", () => queries.getPopularUsers());

  const users = data?.data;

  for (let i = 0; i < users?.length; i++) {
    let current = users[i];
    if (users[i + 1]?.answers?.length > current?.answers?.length) {
      users[i] = users[i + 1];
      users[i + 1] = current;
    }
  }

  return (
    <Container>
      {users?.map((user: User) => {
        return <SingleUser key={user.id} user={user} />;
      })}
    </Container>
  );
}

export default PopularUsersList;
