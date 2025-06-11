import { Tooltip, Typography } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowModes,
  Toolbar,
  ToolbarButton,
  type DataGridProps,
  type GridColDef,
  type GridRowModesModel,
  type GridSlotProps,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

function EditToolbar(props: GridSlotProps["toolbar"]) {
  return (
    <Toolbar>
      <Typography fontWeight="medium" sx={{ flex: 1, mx: 0.5 }}>
        {props.title}
      </Typography>
      <Tooltip title="Add record">
        <ToolbarButton onClick={props.onClick}>
          <AddIcon fontSize="small" />
        </ToolbarButton>
      </Tooltip>
    </Toolbar>
  );
}

interface CrudDataGridProps<T> extends DataGridProps {
  title?: string;
  defaultValue: T;
  onSave?: (x: T) => void;
  onDelete?: (x: T) => void;
}
export default function CrudDataGrid<T>(props: CrudDataGridProps<T>) {
  const [rows, setRows] = useState<T[]>(props.rows ? [...props.rows] : []);
  const [rowModesModels, setRowModesModel] = useState<GridRowModesModel>({});
  const [nextId, setNextId] = useState(rows ? rows.length + 1 : 0);

  const handleAddClick = () => {
    const id = nextId;
    setRows((oldRows) => [...oldRows, { id, ...props.defaultValue }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit },
    }));
    setNextId((old) => old + 1);
  };

  useEffect(() => setRows(props.rows ? [...props.rows] : []), [props.rows]);

  const handleDeleteClick = (row: T) => {
    props.onDelete && props.onDelete(row);
  };

  const withAction = (cols: readonly GridColDef[]) => {
    const actionCol: GridColDef = {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions: ({ row }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(row)}
            color="inherit"
          />,
        ];
      },
    };

    return [...cols, actionCol];
  };

  return (
    <DataGrid
      slots={{ toolbar: EditToolbar }}
      slotProps={{ toolbar: { title: props.title, onClick: handleAddClick } }}
      rows={rows}
      columns={[...withAction(props.columns)]}
      rowModesModel={rowModesModels}
      onRowModesModelChange={setRowModesModel}
      processRowUpdate={props.processRowUpdate}
      onProcessRowUpdateError={(e) => console.log(e)}
      showToolbar
      editMode="row"
      sx={{minHeight: 300}}
    />
  );
}
