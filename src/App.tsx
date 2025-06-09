import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router";
import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";
import VehiclePage from "./pages/VehiclePage";
import UserAvatar from "./components/User/UserAvatar";
import VersionDisplay from "./components/Utils/VersionDisplay";
import Dashboard from "./pages/Dashboard";
import SaisieMutuellePage from "./pages/SaisieMutuellePage";

function App() {
  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/users">
            Users
          </Button>
          <Button color="inherit" component={Link} to="/vehicules">
            Véhicules
          </Button>
          <Button color="inherit" component={Link} to="/SaisieMutuelle">
            Mutuelles
          </Button>

          <Box flexGrow={1} />

          <UserAvatar />
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/users" element={<div>Users</div>} />
          <Route path="/vehicules" element={<VehiclePage />} />
          <Route path="/SaisieMutuelle" element={<SaisieMutuellePage />} />
        </Routes>
        <VersionDisplay />
      </Container>
    </BrowserRouter>
  );
}

export default App;
