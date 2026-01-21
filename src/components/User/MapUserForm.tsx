import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import UsersAutocomplete from "./UsersAutocomplete";
import useUserService from "./useUserService";
import type { MapUserCmd, UsUserDto } from "./User";
import type { KcUserDto } from "../../Keycloak/KcUser";
import EmployeesAutocomplete from "../Employee/EmployeesAutocomplete";
import type { Employee } from "../Employee/Employee";

interface MapUserFormProps {
  kcUser: KcUserDto;
}
export default function MapUserForm(props: MapUserFormProps) {
  const { mapUserCmd } = useUserService();
  const [user, setUser] = useState<UsUserDto | null>(null);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [error, setError] = useState("");
  const [application, setApplication] = useState<"rh" | "regulation">("rh");

  const handleSubmit = async () => {
    if (!user && !employee) return setError("Selectionner un utilisateur");

    const cmd: MapUserCmd = {
      EmployeeID: user?.EmployeeId || employee?.id || 0,
      KeyCloackId: props.kcUser.id,
      SocietyId: user?.SocietyId.toString() || "",
    };

    await mapUserCmd.mutateAsync({ ...cmd, application });
    console.log("all good");
    setUser(null);
  };

  return (
    <Stack gap={2}>
      <Typography>{props.kcUser.username}</Typography>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Application</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={application}
          label="Age"
          size="small"
          onChange={(e) => setApplication(e.target.value)}
        >
          <MenuItem value="rh">rh</MenuItem>
          <MenuItem value="regulation">regulation</MenuItem>
        </Select>
      </FormControl>
      {application == "rh" ? (
        <EmployeesAutocomplete
          onChange={(_e, v) => setEmployee(v)}
          value={employee}
        />
      ) : (
        <UsersAutocomplete onChange={(_e, v) => setUser(v)} value={user} />
      )}
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
