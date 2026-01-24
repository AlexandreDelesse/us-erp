import {
  Box,
  Container,
  FormControlLabel,
  Grid,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import BackButton from "../components/Utils/Buttons/BackButton";
import { Navigate, useParams } from "react-router";
import useKeycloakAdministrationService from "../components/User/KeycloakAdministration/useKeycloakAdministrationService";
import useUserService from "../components/User/useUserService";

interface Props {}

function UserDetailsPage(props: Props) {
  const {} = props;

  const { userRef } = useParams<{ userRef: string }>();
  const { getUserByRef } = useUserService();
  const { userEmailVerifiedMutation, userEnabledMutation } =
    useKeycloakAdministrationService({});

  if (!userRef) return <Navigate to={"/users"} replace />;

  const user = getUserByRef(userRef);

  if (!user) return <Navigate to={"/users"} replace />;

  const handleOnUpdateEmailVerified = (newValue: boolean) => {
    if (!user.keycloakId) return;
    console.log(newValue);
    return userEmailVerifiedMutation.mutate({
      userId: user.keycloakId,
      enabled: newValue,
    });
  };

  const handleOnEnableUser = (newValue: boolean) => {
    if (!user.keycloakId) return;
    return userEnabledMutation.mutate({
      userId: user.keycloakId,
      enabled: newValue,
    });
  };

  return (
    <Container>
      <BackButton />
      <Typography mt={2} fontSize={24}>
        {user.lastname} {user.firstname}
      </Typography>

      <Grid container spacing={2}>
        <Grid size={6}>
          <Box minHeight={150} mt={2} padding={2} bgcolor={"whitesmoke"}>
            <Typography fontSize={18}>Administration Keycloak</Typography>
            <Box>
              {!user.keycloakId ? (
                <Box mt={5}>
                  <Typography variant="caption">
                    Pas de compte Keycloak pour cet utilisateur
                  </Typography>
                </Box>
              ) : (
                <>
                  <Stack mt={2} direction={"column"}>
                    <FormControlLabel
                      control={
                        <Switch
                          disabled={userEnabledMutation.isPending}
                          checked={user.enabled}
                          onChange={(_e, checked) =>
                            handleOnEnableUser(checked)
                          }
                        />
                      }
                      label="Compte activé"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          disabled={userEmailVerifiedMutation.isPending}
                          checked={user.emailVerified}
                          onChange={(_e, checked) =>
                            handleOnUpdateEmailVerified(checked)
                          }
                        />
                      }
                      label="Email vérifié"
                    />
                  </Stack>
                </>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid size={6}>
          <Box minHeight={150} mt={2} padding={2} bgcolor={"whitesmoke"}>
            <Typography fontSize={18}>Administration Utilisateur</Typography>
            <Box>
              {!user.userId && (
                <Typography>Pas d'utilisateur en base</Typography>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default UserDetailsPage;
