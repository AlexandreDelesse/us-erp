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
import useUserService from "./useUserService";
import type { MapUserCmd } from "./User";
import type { KcUserDto } from "../../Keycloak/KcUser";
import useAutocompleteOptions from "../Employee/useAutocompleteOptions";
import type {
  AutocompleteOption,
  ContextKey,
} from "../Employee/AutocompleteStrategy";
import ContextualAutocomplete from "../Employee/ContextualAutocomplete";

interface MapUserFormProps {
  kcUser: KcUserDto;
}
export default function MapUserForm(props: MapUserFormProps) {
  const { mapUserCmd } = useUserService();
  const [option, setOption] = useState<AutocompleteOption | null>(null);
  const [error, setError] = useState("");
  const [application, setApplication] = useState<ContextKey>("RH");

  const handleSubmit = async () => {
    if (!option) return setError("Selectionner un utilisateur");

    const cmd: MapUserCmd = {
      EmployeeID: parseInt(option?.id ?? "0"),
      KeyCloackId: props.kcUser.id,
      SocietyId: "",
    };

    await mapUserCmd.mutateAsync({ ...cmd, application });
    console.log("all good");
    setOption(null);
  };

  const { data } = useAutocompleteOptions({ context: application });
  console.log("data from form ", data);

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
          <MenuItem value="RH">rh</MenuItem>
          <MenuItem value="REGULATION">regulation</MenuItem>
        </Select>
      </FormControl>
      <ContextualAutocomplete
        context={application}
        autocompleteProps={{ onChange: (_e, o) => setOption(o), value: option }}
      />
      {/* {application == "RH" ? (
        <EmployeesAutocomplete
          onChange={(_e, v) => setEmployee(v)}
          value={employee}
        />
      ) : (
        <UsersAutocomplete onChange={(_e, v) => setUser(v)} value={user} />
      )} */}
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
