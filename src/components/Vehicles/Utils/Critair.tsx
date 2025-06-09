import { Chip } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function Critair(props: { critair: boolean }) {
  return (
    <Chip
      size="small"
      icon={props.critair ? <CheckIcon /> : <ErrorOutlineIcon />}
      color={props.critair ? "success" : "error"}
      label="Crit'air"
    />
  );
}
