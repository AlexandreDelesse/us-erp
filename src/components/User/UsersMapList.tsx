import {
  IconButton,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import ErrorHandler from "../Utils/Error/ErrorHandler";
import LogoLoader from "../Utils/LogoLoader";
import useUserService from "./useUserService";
import DeleteIcon from "@mui/icons-material/Delete";
import useKeycloakService from "../../Keycloak/useKeycloakService";
import { useState } from "react";

export default function UsersMapList() {
  const { usersMapQry, deleteUserMapCmd, getUserName } = useUserService();
  const { getKcUserName } = useKeycloakService();
  const [search, setSearch] = useState("");

  if (usersMapQry.isLoading) return <LogoLoader />;
  if (usersMapQry.isError) return <ErrorHandler error={usersMapQry.error} />;

  const usersMap = usersMapQry.data ?? [];
  console.log("User map ", usersMap);

  const filteredUsersMap = search
    ? usersMap.filter(
        (u) =>
          getKcUserName(u.KeyCloackId)
            ?.toLocaleLowerCase()
            .includes(search.toLowerCase()) ||
          getUserName(u.EmployeeID)
            ?.toLowerCase()
            .includes(search.toLowerCase()),
      )
    : usersMap;

  return (
    <>
      <TextField
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="small"
        variant="standard"
        sx={{ my: 2 }}
        placeholder="Rechercher..."
      />
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Mapping Id</TableCell>
            <TableCell>Keycloak</TableCell>
            <TableCell>Urgence Sante</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsersMap.map((u) => (
            <TableRow
              key={u.MapId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {u.MapId}
              </TableCell>
              <TableCell>
                <ListItemText
                  primary={getKcUserName(u.KeyCloackId)}
                  secondary={u.KeyCloackId}
                />
              </TableCell>
              <TableCell>{getUserName(u.EmployeeID)}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => deleteUserMapCmd.mutate(u.MapId)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
