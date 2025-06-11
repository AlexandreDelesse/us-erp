import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import type { Concentrateur } from "./Consentrateur.model";

interface ConcentrateurTableProps {
  concentrateurs: Concentrateur[];
  onDelete: (amc: string) => void;
}
export default function ConcentrateurTable(props: ConcentrateurTableProps) {
  return (
    <Table aria-label="simple table" size="small">
      <TableHead>
        <TableRow>
          <TableCell>N° AMC</TableCell>
          <TableCell>Nom</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.concentrateurs.map((row) => (
          <TableRow
            key={row.name}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell>{row.amc}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>
              <IconButton onClick={() => props.onDelete(row.amc)}>
                <DeleteIcon color="error" />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
