import { AppBar, Box, Button, MenuItem, Toolbar } from "@mui/material";
import { Link, useNavigate } from "react-router";
import UserAvatar from "../User/UserAvatar";
import AppBarMenuButton from "./AppBarMenuButton";

export default function TopAppBar() {
  const navigate = useNavigate();

  const comptaMenuItems = [
    <MenuItem key={"Emprunts"} onClick={() => navigate("/emprunts")}>
      Emmprunts
    </MenuItem>,
  ];
  const rhMenuItems = [
    <MenuItem key={"Mutuelles"} onClick={() => navigate("/SaisieMutuelle")}>
      Mutuelles
    </MenuItem>,
    <MenuItem key={"Utilisateurs"} onClick={() => navigate("/users")}>
      Utilisateurs
    </MenuItem>,
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <AppBarMenuButton buttonLabel="RH" menuItems={rhMenuItems} />
        <Button color="inherit" component={Link} to="/vehicules">
          Véhicules
        </Button>

        <AppBarMenuButton
          buttonLabel="Comptabilité"
          menuItems={comptaMenuItems}
        />

        <Box flexGrow={1} />

        <UserAvatar />
      </Toolbar>
    </AppBar>
  );
}
