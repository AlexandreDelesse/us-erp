import "./App.css";
import { HashRouter, Link, Route, Routes } from "react-router";
import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";
import VehiclePage from "./pages/VehiclePage";
import UserAvatar from "./components/User/UserAvatar";
import VersionDisplay from "./components/Utils/VersionDisplay";
import Dashboard from "./pages/Dashboard";
import SaisieMutuellePage from "./pages/SaisieMutuellePage";
import LoanPage from "./pages/LoanPage";
import UserPage from "./pages/UserPage";
import TopAppBar from "./components/AppBar/TopAppBar";

function App() {
  return (
    <HashRouter>
      <TopAppBar />
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/emprunts" element={<LoanPage />} />
          <Route path="/users" element={<UserPage />} />
          <Route path="/vehicules" element={<VehiclePage />} />
          <Route path="/SaisieMutuelle" element={<SaisieMutuellePage />} />
        </Routes>
        <VersionDisplay />
      </Container>
    </HashRouter>
  );
}

export default App;
