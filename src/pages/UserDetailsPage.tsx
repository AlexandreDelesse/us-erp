import { Container, Typography } from "@mui/material";
import BackButton from "../components/Utils/Buttons/BackButton";
import { Navigate, useLocation } from "react-router";
import type { User } from "../components/User/User";

interface Props {}
interface UserDetailsState {
  user: User;
}

function UserDetailsPage(props: Props) {
  const {} = props;

  const location = useLocation();

  const state = location.state as UserDetailsState | null;

  if (!state || !state.user) return <Navigate to={"/users"} replace />;

  return (
    <Container>
      <BackButton />
      <Typography>
        {state.user.lastname} {state.user.firstname}
      </Typography>
    </Container>
  );
}

export default UserDetailsPage;
