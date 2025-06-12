import { Box, Tab, Tabs } from "@mui/material";
import ConcentrateurContainer from "../components/Concentrateur/ConcentrateurContainer";
import MutuelleContainer from "../components/Mutuelle/MutuelleContainer";
import { useState } from "react";

export default function SaisieMutuellePage() {
  const [value, setValue] = useState(0);
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={(_e, v) => setValue(v)}
          aria-label="basic tabs example"
          sx={{ marginBottom: 3 }}
        >
          <Tab label="Mutuelles" />
          <Tab label="Concentrateur" />
          <Tab label="Affectation" />
        </Tabs>
      </Box>

      <div hidden={value !== 0}>
        <MutuelleContainer />
      </div>
      <div hidden={value !== 1}>
        <MutuelleContainer isConcentrator />
      </div>
      <div hidden={value !== 2}>
        <ConcentrateurContainer />
      </div>
    </>
  );
}
