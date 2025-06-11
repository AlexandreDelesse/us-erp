import PropertyDisplay from "../../Utils/PropertyDisplay";
import Critair from "../Utils/Critair";

import { Box, Divider, Typography } from "@mui/material";

import type { IVehicle } from "../IVehicle";

export default function VehicleDetail(props: { vehicle?: IVehicle }) {
  if (!props.vehicle)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        Aucun véhicule sélectionné
      </Box>
    );

  return (
    <Box sx={{ backgroundColor: "whitesmoke", display: "flex" }}>
      <Box padding={2} flex={1}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box>
            <Typography>
              {props.vehicle.Immat} - {props.vehicle.Alias}
            </Typography>
            <Typography variant="caption">
              {props.vehicle.Fonction} | {props.vehicle.Marque}{" "}
              {props.vehicle.Model}
            </Typography>
          </Box>
          <Critair critair={!!props.vehicle.Critair} />
        </Box>

        <Box marginTop={2}>
          <Box display="flex" gap={3}>
            <PropertyDisplay
              title="Proprietaire"
              content={props.vehicle.Proprietaire}
            />
            <PropertyDisplay title="Loué à" content={"-"} />
            <PropertyDisplay
              title="Agréement ARS"
              content={props.vehicle.AgrementArs || "-"}
            />
          </Box>

          <Box display="flex" gap={2} marginTop={2}>
            <PropertyDisplay
              title="Nº Carte Totale"
              content={props.vehicle.NumCarteTotal || "-"}
            />
            <PropertyDisplay
              title="Compte Totale"
              content={props.vehicle.SteCarteTotal || "-"}
            />
          </Box>
          {/* <Button sx={{ marginTop: 1 }} endIcon={<DownloadIcon />}>
            Contrat le location
          </Button> */}
        </Box>
      </Box>

      <Divider
        sx={{ height: 100, alignSelf: "center" }}
        orientation="vertical"
        flexItem
      />
      <Box padding={2} flex={1}>
        <Box display="flex" gap={3} marginTop={2}>
          <PropertyDisplay
            title="Mise en service"
            content={props.vehicle.MiseEnService}
          />
          <PropertyDisplay title="Km" content={props.vehicle.Km} />
        </Box>

        <Box display="flex" gap={3} marginTop={2}>
          <PropertyDisplay
            title="Assuré par"
            content={props.vehicle.Assurance?.Societe || "-"}
          />
          <PropertyDisplay
            title="Tarif"
            content={props.vehicle.Assurance?.Tarif + "€" || "-"}
          />
        </Box>
      </Box>
    </Box>
  );
}
