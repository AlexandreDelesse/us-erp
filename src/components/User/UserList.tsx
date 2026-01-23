import {
  Avatar,
  Chip,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import useUserService from "./useUserService";
import LogoLoader from "../Utils/LogoLoader";
import ErrorHandler from "../Utils/Error/ErrorHandler";
import logoUs from "../../assets/Images/logo-us.png";
import logoKc from "../../assets/Images/logo-kc.png";
import { useState } from "react";

interface Props {}

function UserList(props: Props) {
  const {} = props;
  type UserFilter = "KC" | "US" | "ENROLLED";

  const { users, userQry } = useUserService();
  const [filters, setFilters] = useState<UserFilter[]>([
    "KC",
    "US",
    "ENROLLED",
  ]);

  if (userQry.isLoading) return <LogoLoader />;
  if (userQry.isError) return <ErrorHandler error={userQry.error} />;

  const getUserCategory = (user: {
    kcId?: string;
    userId?: number;
  }): UserFilter => {
    if (user.kcId && user.userId) return "ENROLLED";
    if (user.kcId) return "KC";
    return "US";
  };

  const filteredUsers = users.filter((user) =>
    filters.includes(getUserCategory(user)),
  );

  console.log(filteredUsers);

  const toggleFilter = (context: UserFilter) => {
    setFilters((prev) =>
      prev.includes(context)
        ? prev.filter((f) => f !== context)
        : [...prev, context],
    );
  };

  return (
    <>
      <Stack mt={2} spacing={2} direction="row">
        <Chip
          onClick={() => toggleFilter("US")}
          avatar={<Avatar alt="Urgence sante" src={logoUs} />}
          label="Urgence sante"
          variant={filters.includes("US") ? "filled" : "outlined"}
        />
        <Chip
          onClick={() => toggleFilter("KC")}
          avatar={<Avatar alt="Urgence sante" src={logoKc} />}
          label="Keycloak"
          variant={filters.includes("KC") ? "filled" : "outlined"}
        />
        <Chip
          onClick={() => toggleFilter("ENROLLED")}
          avatar={<Avatar alt="Urgence sante" src={logoKc} />}
          label="Enrollé"
          variant={filters.includes("ENROLLED") ? "filled" : "outlined"}
        />
      </Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Prénom</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredUsers.map((u) => (
              <TableRow>
                <TableCell>
                  <Grid container spacing={1}>
                    <Grid size={6}>
                      {u.userId && (
                        <img
                          src={logoUs}
                          width={"20px"}
                          height={"20px"}
                          alt="logo urgence sante"
                        />
                      )}
                    </Grid>
                    <Grid size={6}>
                      {u.keycloakId && (
                        <img
                          src={logoKc}
                          width={"30px"}
                          height={"20px"}
                          alt="logo urgence sante"
                        />
                      )}
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.firstname}</TableCell>
                <TableCell>{u.lastname}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default UserList;
