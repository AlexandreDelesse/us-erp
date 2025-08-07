import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import type { LoanComputedDto } from "./Loan.model";

import DateDisplayer from "../Utils/DateDisplayer";

import { grey } from "@mui/material/colors";

interface LoanTableProps {
  loansComputed: LoanComputedDto[];
}

export default function LoanTable(props: LoanTableProps) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Label</TableCell>
            <TableCell>Categorie</TableCell>
            <TableCell>Societe</TableCell>
            <TableCell>Début</TableCell>
            <TableCell align="center">Capital</TableCell>
            <TableCell align="center">Taux</TableCell>
            <TableCell align="center">Durée en mois</TableCell>
            <TableCell align="right">Mensualité</TableCell>
            <TableCell align="right">CRD</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {props.loansComputed.map(({ loan, ...computed }) => (
            <TableRow
              key={loan.id}
              sx={{
                backgroundColor: computed.isEnd ? grey[100] : "inherit",
              }}
            >
              <TableCell sx={{ maxWidth: 150, overflow: "clip" }}>
                {loan.label}
              </TableCell>
              <TableCell sx={{ maxWidth: 150 }}>{loan.category}</TableCell>
              <TableCell sx={{ maxWidth: 150 }}>{loan.company}</TableCell>
              <TableCell>
                <DateDisplayer value={loan.startDate} />
              </TableCell>
              <TableCell align="center">
                {Intl.NumberFormat("fr-FR").format(loan.capital)}
              </TableCell>
              <TableCell align="center">
                {(loan.rate * 100).toFixed(2)}%
              </TableCell>
              <TableCell align="center">{loan.durationInMonth}</TableCell>
              <TableCell align="right">
                {Intl.NumberFormat("fr-FR", {
                  maximumSignificantDigits: 5,
                }).format(computed.annuity)}
              </TableCell>
              <TableCell align="right">
                {Intl.NumberFormat("fr-FR", {
                  maximumSignificantDigits: 5,
                }).format(computed.remainingCapital)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
