import "./App.css";
import { HashRouter, Route, Routes } from "react-router";
import { Container } from "@mui/material";
import VehiclePage from "./pages/VehiclePage";
import VersionDisplay from "./components/Utils/VersionDisplay";
import Dashboard from "./pages/Dashboard";
import SaisieMutuellePage from "./pages/SaisieMutuellePage";
import LoanPage from "./pages/LoanPage";
import UserPage from "./pages/UserPage";
import TopAppBar from "./components/AppBar/TopAppBar";
import UserDetailsPage from "./pages/UserDetailsPage";

function App() {
  return (
    <HashRouter>
      <TopAppBar />
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/emprunts" element={<LoanPage />} />
          <Route path="/users" element={<UserPage />} />
          <Route path="/userDetails/:userRef" element={<UserDetailsPage />} />

          <Route path="/vehicules" element={<VehiclePage />} />
          <Route path="/SaisieMutuelle" element={<SaisieMutuellePage />} />
        </Routes>
        <VersionDisplay />
      </Container>
    </HashRouter>
  );
}

export default App;
