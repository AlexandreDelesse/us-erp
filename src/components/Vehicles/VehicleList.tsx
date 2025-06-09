import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import useGetVehicles from "../../hooks/useGetVehicles";

import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { useState } from "react";
import type { IVehicle } from "./IVehicle";
import ImmatFormatter from "./Utils/ImmatFormatter";

interface VehiculeListProps {
  selectedVehicle?: IVehicle | undefined;
  onSelectVehicle?: (v: IVehicle) => any;
}
export default function VehicleList(props: VehiculeListProps) {
  const req = useGetVehicles();
  const onSelectFn = (v: IVehicle) => {
    if (props.onSelectVehicle) props.onSelectVehicle(v);
    return;
  };

  const [search, setSearch] = useState("");

  const renderVehicle = (vehicle: IVehicle) => (
    <ListItemButton
      selected={
        props.selectedVehicle && props.selectedVehicle.Immat === vehicle.Immat
      }
      onClick={() => onSelectFn(vehicle)}
    >
      <ListItemIcon>
        <DirectionsCarIcon />
      </ListItemIcon>
      <ListItemText
        primary={`${vehicle.Alias} ${ImmatFormatter(vehicle.Immat)}`}
        secondary={`${vehicle.Marque} ${vehicle.Model}`}
      />
    </ListItemButton>
  );

  const filterFn = (v: IVehicle) =>
    v.Immat.toLowerCase().includes(search.toLowerCase()) ||
    v.Alias.toLowerCase().includes(search.toLowerCase());

  if (!req.data) return;

  const filteredVehicles = search ? req.data?.filter(filterFn) : req.data;

  if (filteredVehicles.length === 1) onSelectFn(filteredVehicles[0]);

  return (
    <Box>
      <TextField
        variant="standard"
        label="Rechercher un vehicule"
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <List>{filteredVehicles.filter(filterFn).map(renderVehicle)}</List>
    </Box>
  );
}
