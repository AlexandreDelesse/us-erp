import SimpleCard from "../../../Utils/Cards/SimpleCard";
import {
  Box,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import useKeycloakAdministrationService from "../useKeycloakAdministrationService";
import type { User } from "../../User";

export interface KeycloakAdminProps {
  user?: User;
}
function KeycloakAdmin(props: KeycloakAdminProps) {
  const { user } = props;
  const { userEmailVerifiedMutation, userEnabledMutation } =
    useKeycloakAdministrationService();

  if (!user) return null;

  const handleOnUpdateEmailVerified = (newValue: boolean) => {
    if (!user.keycloakId) return;
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
    <SimpleCard sx={{ height: "100%" }} title="Administration Keycloak">
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
                    onChange={(_e, checked) => handleOnEnableUser(checked)}
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
    </SimpleCard>
  );
}

export default KeycloakAdmin;
