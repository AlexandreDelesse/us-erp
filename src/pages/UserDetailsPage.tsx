import { Container, Grid } from "@mui/material";
import BackButton from "../components/Utils/Buttons/BackButton";
import { Navigate, useParams } from "react-router";
import useUserService from "../components/User/useUserService";
import UserName from "../components/User/Components/UserName";
import KeycloakAdmin from "../components/User/KeycloakAdministration/Components/KeycloakAdmin";
import EmployeeAdmin from "../components/User/EmployeeAdministration/EmployeeAdmin";
import { useState } from "react";
import UserDetailTabs from "../components/User/Components/UserDetailTabs";
import SubscriptionList from "../components/User/NotificationAdministration/SubscriptionList";

function UserDetailsPage() {
  const { userRef } = useParams<{ userRef: string }>();
  const [tab, setTab] = useState(0);
  const { getUserByRef } = useUserService();

  if (!userRef) return <Navigate to={"/users"} replace />;

  const user = getUserByRef(userRef);

  if (!user) return <Navigate to={"/users"} replace />;

  return (
    <Container>
      <BackButton />

      <UserName
        firstname={user.firstname ?? ""}
        lastname={user.lastname ?? ""}
      />
      <UserDetailTabs tab={tab} setTab={setTab} />

      {tab == 0 && (
        <Grid container spacing={2}>
          <Grid size={6}>
            <KeycloakAdmin user={user} />
          </Grid>
          <Grid size={6}>
            <EmployeeAdmin user={user} />
          </Grid>
        </Grid>
      )}
      {tab == 1 && <SubscriptionList userId={user.keycloakId} />}
    </Container>
  );
}

export default UserDetailsPage;
