import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import type { ConcentMutuel } from "./ConcentMutuel.model";

interface ConcentMutuelTableProps {
  concentMutuels: ConcentMutuel[];
  onDelete: (amc: string) => void;
}
export default function ConcentMutuelTable(props: ConcentMutuelTableProps) {
  return (
    <Table aria-label="simple table" size="small">
      <TableHead>
        <TableRow>
          <TableCell>Mutuelle</TableCell>
          <TableCell>Concentrateur</TableCell>
          <TableCell>Début</TableCell>
          <TableCell>Fin</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.concentMutuels.map((row) => (
          <TableRow
            key={row.concentrateur.amc}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell>{row.mutuelle.name}</TableCell>
            <TableCell>{row.concentrateur.name}</TableCell>
            <TableCell>{new Date(row.start).toLocaleDateString()}</TableCell>
            <TableCell>
              {row.end && new Date(row.end).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <IconButton onClick={() => props.onDelete(row.concentrateur.amc)}>
                <DeleteIcon color="error" />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
