import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import UsersAutocomplete from "./UsersAutocomplete";
import useUserService from "./useUserService";
import type { MapUserCmd, UsUserDto } from "./User";
import type { KcUserDto } from "../../Keycloak/KcUser";

interface MapUserFormProps {
  kcUser: KcUserDto;
}
export default function MapUserForm(props: MapUserFormProps) {
  const { mapUserCmd } = useUserService();
  const [user, setUser] = useState<UsUserDto | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!user) return setError("Selectionner un utilisateur");

    const cmd: MapUserCmd = {
      EmployeeID: user.EmployeeId,
      KeyCloackId: props.kcUser.id,
      SocietyId: user.SocietyId.toString(),
    };

    await mapUserCmd.mutateAsync(cmd);
    console.log("all good");
    setUser(null);
  };

  return (
    <Stack gap={2}>
      <Typography>{props.kcUser.username}</Typography>
      <UsersAutocomplete onChange={(_e, v) => setUser(v)} value={user} />
      {error && (
        <Typography variant="caption" color="error">
          {error}
        </Typography>
      )}

      <Button loading={mapUserCmd.isPending} onClick={handleSubmit}>
        Valider
      </Button>
    </Stack>
  );
}
