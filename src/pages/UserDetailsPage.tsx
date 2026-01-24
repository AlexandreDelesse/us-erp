import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Grid,
  Modal,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import BackButton from "../components/Utils/Buttons/BackButton";
import { Navigate, useParams } from "react-router";
import useKeycloakAdministrationService from "../components/User/KeycloakAdministration/useKeycloakAdministrationService";
import useUserService from "../components/User/useUserService";
import EmployeesAutocomplete from "../components/Employee/EmployeesAutocomplete";
import { useState } from "react";
import type { Employee } from "../components/Employee/Employee";

function UserDetailsPage() {
  const { userRef } = useParams<{ userRef: string }>();
  const { getUserByRef } = useUserService();
  const { userEmailVerifiedMutation, userEnabledMutation } =
    useKeycloakAdministrationService();
  const [employeeSelected, setEmployeeSelected] = useState<Employee | null>(
    null,
  );
  const [openModal, setOpenModal] = useState(false);

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

  const handleAssociateEmployee = () => {
    alert("Not implemented");
  };

  const handleCreateEmployee = () => {
    return toggleOpenModal();
  };

  const toggleOpenModal = () => setOpenModal((old) => !old);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
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
            <Box mt={2}>
              {!user.userId && (
                <>
                  <Typography>Associer un utilisateur</Typography>
                  <Stack mt={2}>
                    <EmployeesAutocomplete
                      onChange={(_e, value) => setEmployeeSelected(value)}
                      onNoOptionClick={handleCreateEmployee}
                    />
                    <Button
                      disabled={!employeeSelected}
                      variant="text"
                      onClick={handleAssociateEmployee}
                    >
                      Associer
                    </Button>
                  </Stack>
                </>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Modal open={openModal} onClose={toggleOpenModal}>
        <Stack sx={style} spacing={2}>
          <Typography>Créer un utilisateur</Typography>
          <TextField label="Email" size="small" value={user.email} />
          <TextField label="Prénom" size="small" value={user.firstname} />
          <TextField label="Nom" size="small" value={user.lastname} />
          <Button onClick={() => alert("Not implemented")}>
            Créer utilisateur
          </Button>
        </Stack>
      </Modal>
    </Container>
  );
}

export default UserDetailsPage;
