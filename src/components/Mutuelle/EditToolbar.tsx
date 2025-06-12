import { Tooltip, Typography } from "@mui/material";
import { Toolbar, ToolbarButton, type GridSlotProps } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";

export default function EditToolbar(props: GridSlotProps["toolbar"]) {
  return (
    <Toolbar>
      <Typography fontWeight="medium" sx={{ flex: 1, mx: 0.5 }}>
        {props.title}
      </Typography>
      <Tooltip title="Add record">
        <ToolbarButton color="primary" onClick={props.onClick}>
          <AddIcon fontSize="small" />
        </ToolbarButton>
      </Tooltip>
    </Toolbar>
  );
}
