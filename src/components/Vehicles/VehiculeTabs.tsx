import React, { useState } from "react";
import type { IVehicle } from "./IVehicle";
import { Box, Tab, Tabs } from "@mui/material";
import VehicleDetail from "./Tabs/VehicleDetail";
import VehiculeEntretien from "./Tabs/VehiculeEntretien";

export default function VehiculeTabs(props: { vehicle?: IVehicle }) {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Infos générales" />
          <Tab label="Suivit entretien" />
          <Tab label="Comptabilité" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <VehicleDetail vehicle={props.vehicle} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <VehiculeEntretien vehicle={props.vehicle} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0, marginTop: 2 }}>{children}</Box>}
    </div>
  );
}
