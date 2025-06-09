import { Box } from "@mui/material";
import SimpleCard from "../Utils/Cards/SimpleCard";
import PropertyDisplay from "../Utils/PropertyDisplay";
interface dProps {
  v1: number;
  v2: number;
  v3: number;
}
export default function TotalVehicleType(props: dProps) {
  return (
    <SimpleCard sx={{ maxWidth: 300 }} title="Nombre de véhicules">
      <Box display="flex" justifyContent="space-between">
        <PropertyDisplay title="Ambulance" content={props.v1} />
        <PropertyDisplay title="Sang" content={props.v2} />
        <PropertyDisplay title="funeraire" content={props.v3} />
      </Box>
    </SimpleCard>
  );
}
