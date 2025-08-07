import type { LoansInformations } from "./Loan.model";
import { Box } from "@mui/material";
import PropertyDisplay from "../Utils/PropertyDisplay";

interface LoansInformationsView {
  infos: LoansInformations;
}
export default function LoansInformationsView(props: LoansInformationsView) {
  return (
    <Box
      display={"flex"}
      padding={2}
      gap={4}
      marginY={2}
      borderRadius={2}
      sx={{ backgroundColor: "whitesmoke" }}
    >
      <PropertyDisplay
        title="Nombre d'emprunts"
        content={props.infos.totalNbLoans}
      />
      <PropertyDisplay
        title="Total mensualités"
        content={Intl.NumberFormat().format(props.infos.totalAnnuity)}
      />
      <PropertyDisplay
        title="Total capital restant"
        content={Intl.NumberFormat().format(props.infos.totalRemainingCapital)}
      />
    </Box>
  );
}
