import type { IVehicle } from "../IVehicle";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";

export default function VehiculeEntretien(props: { vehicle?: IVehicle }) {
  const entretiensAVenir =
    props.vehicle?.Entretiens.filter((e) => !e.RealiseA && !e.RealiséLe) || [];

  const entretiensRealises =
    props.vehicle?.Entretiens.filter((e) => e.RealiseA || e.RealiséLe) || [];

  return (
    <Box>
      <Typography>Entretiens a venir</Typography>
      <TableContainer sx={{ marginTop: 2 }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          {/* <TableHead>
            <TableRow>
              <TableCell>Acteur</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Prevu pour</TableCell>
            </TableRow>
          </TableHead> */}
          <TableBody>
            {entretiensAVenir.map((row) => (
              <TableRow
                key={row.Acteur + row.Type}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.Acteur}
                </TableCell>
                <TableCell align="right">{row.Type}</TableCell>
                <TableCell align="right">
                  {row.PrevuA}Km {row.PrevuLe}{" "}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography mt={4}>Entretiens Réalisés</Typography>
      <TableContainer sx={{ marginTop: 2 }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          {/* <TableHead>
            <TableRow>
              <TableCell>Acteur</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Prevu pour</TableCell>
            </TableRow>
          </TableHead> */}
          <TableBody>
            {entretiensRealises.map((row) => (
              <TableRow
                key={row.Acteur + row.Type}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.Acteur}
                </TableCell>
                <TableCell align="right">{row.Type}</TableCell>
                <TableCell align="right">
                  {row.RealiséLe || row.RealiseA}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
