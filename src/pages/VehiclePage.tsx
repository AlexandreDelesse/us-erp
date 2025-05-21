import { Box, Divider, Typography } from "@mui/material";
import VehicleTable from "../components/Vehicles/VehiclesTable";

export default function VehiclePage() {
  return (
    <>
      <Typography variant="h5">Liste des véhicules</Typography>

      <VehicleTable />
    </>
  );
}
