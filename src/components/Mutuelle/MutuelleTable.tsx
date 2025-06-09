import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import type { Mutuelle } from "./Mutuelle.model";
import DeleteIcon from "@mui/icons-material/Delete";

interface MutuelleTableProps {
  mutuelles: Mutuelle[];
  onDelete: (amc: string) => void;
}
export default function MutuelleTable(props: MutuelleTableProps) {
  return (
    <Table sx={{ width: "50%" }} aria-label="simple table" size="small">
      <TableHead>
        <TableRow>
          <TableCell>N° AMC</TableCell>
          <TableCell>Nom</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.mutuelles.map((row) => (
          <TableRow
            key={row.name}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell>{row.amcNb}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>
              <IconButton onClick={() => props.onDelete(row.amcNb)}>
                <DeleteIcon color="error" />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
