import { Grid } from "@mui/material";
import VehicleList from "../components/Vehicles/VehicleList";
import { useState } from "react";
import type { IVehicle } from "../components/Vehicles/IVehicle";
import VehiculeTabs from "../components/Vehicles/VehiculeTabs";

export default function VehiclePage() {
  const [selectedVehicle, setSelectedVehicle] = useState<IVehicle | undefined>(
    undefined
  );

  return (
    <Grid container spacing={3}>
      <Grid size={4}>
        <VehicleList
          selectedVehicle={selectedVehicle}
          onSelectVehicle={(v) => setSelectedVehicle(v)}
        />
      </Grid>

      <Grid size={8}>
        <VehiculeTabs vehicle={selectedVehicle} />
      </Grid>
    </Grid>
  );
}
