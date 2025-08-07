import {
  Box,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import useKeycloakService from "../../Keycloak/useKeycloakService";
import ErrorHandler from "../Utils/Error/ErrorHandler";
import LogoLoader from "../Utils/LogoLoader";

import SettingsIcon from "@mui/icons-material/Settings";

import ModalButton from "../Utils/Buttons/ModalButton";
import MapUserForm from "./MapUserForm";
import { useState } from "react";

export default function KcUserList() {
  const { userQuery, userMutation } = useKeycloakService();
  const [searchFilter, setSearchFilter] = useState("");
  const [onlyDisabled, setOnlyDisabled] = useState<boolean>(false);

  if (userQuery.isLoading) return <LogoLoader />;
  if (userQuery.isError) return <ErrorHandler error={userQuery.error} />;

  const kcUsers = userQuery.data ?? [];
  const filteredKcUsers =
    searchFilter || onlyDisabled
      ? kcUsers
          .filter((u) =>
            u.username.toLowerCase().includes(searchFilter.toLowerCase())
          )
          .filter((u) => (onlyDisabled ? !u.enabled : true))
      : kcUsers;

  return (
    <Box p={2}>
      <Stack gap={4} direction={"row"}>
        <TextField
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          label={"Rechercher..."}
          size="small"
          variant="standard"
        />
        <FormControlLabel
          control={
            <Switch
              size="small"
              checked={onlyDisabled}
              onChange={() => setOnlyDisabled(!onlyDisabled)}
            />
          }
          label="Cacher activés"
        />
      </Stack>
      <List>
        {filteredKcUsers.map((u) => (
          <ListItem
            key={u.id}
            sx={{
              gap: 3,
            }}
          >
            <ModalButton icon buttonProps={{ startIcon: <SettingsIcon /> }}>
              <MapUserForm kcUser={u} />
            </ModalButton>
            <ListItemIcon sx={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                edge="start"
                checked={u.enabled}
                tabIndex={-1}
                disableRipple
                onChange={() =>
                  userMutation.mutate({ enabled: !u.enabled, userId: u.id })
                }
              />

              <Typography>{u.enabled ? "Enabled" : "Disabled"}</Typography>
            </ListItemIcon>

            <ListItemText id={u.id} primary={u.username} />

            {/* For sepaartion */}
            <Box />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
