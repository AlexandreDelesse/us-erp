import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { Mutuelle, MutuelleCmd } from "./Mutuelle.model";
import EditToolbar from "./EditToolbar";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

interface MutuelleDataGridProps {
  mutuelles: Mutuelle[];
  onDelete: (id: number) => void;
  onUpdate: (m: Mutuelle) => void;
  onCreate: (m: MutuelleCmd) => void;
  title?: string;
  emptyModel: Mutuelle;
}
export default function MutuelleDataGrid(props: MutuelleDataGridProps) {
  const [rows, setRows] = useState<(Mutuelle & { isNew?: boolean })[]>(
    props.mutuelles
  );
  const [rowModeModels, setRowModeModels] = useState({});

  useEffect(() => setRows(props.mutuelles), [props.mutuelles]);

  const handleAddRow = () => {
    if (rows.some((m) => !m.AMC || !m.AMC)) return;
    const newId = rows.length > 0 ? Math.max(...rows.map((r) => r.ID)) + 1 : 0;
    const newRow: Mutuelle & { isNew: boolean } = {
      ...props.emptyModel,
      ID: newId,
      isNew: true,
    };
    setRows((prev) => [newRow, ...prev]);
  };

  const processRowUpdate = async (newRow: any) => {
    if (newRow.isNew) {
      let { isNew, ...r } = newRow;
      r.ID = 0;
      props.onCreate(r);
    } else {
      let { isNew, ...r } = newRow;

      props.onUpdate(r);
    }
    // Remet la ligne dans l’état "non nouveau"
    setRows((prev) =>
      prev.map((r) => (r.ID === newRow.ID ? { ...newRow, isNew: false } : r))
    );
    return newRow;
  };

  const columns: GridColDef[] = [
    {
      field: "AMC",
      headerName: "Code AMC",
      width: 200,
      editable: true,
      flex: 1,
    },
    { field: "Name", headerName: "Nom", width: 200, editable: true, flex: 1 },
    {
      field: "TeletransNumber",
      headerName: "N° Teletransmision",
      width: 200,
      editable: true,
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        const row = params.row as Mutuelle;
        return (
          <IconButton
            aria-label="supprimer"
            onClick={() => props.onDelete(row.ID)}
            size="small"
            color="error"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        );
      },
    },
  ];

  return (
    <DataGrid
      slots={{ toolbar: EditToolbar }}
      slotProps={{
        toolbar: { title: props.title ?? "Mutuelles", onClick: handleAddRow },
      }}
      rows={rows}
      columns={columns}
      rowModesModel={rowModeModels}
      onRowModesModelChange={setRowModeModels}
      processRowUpdate={processRowUpdate}
      onProcessRowUpdateError={(e) => console.log(e)}
      showToolbar
      getRowId={(row: Mutuelle) => row.ID}
      editMode="row"
      sx={{ minHeight: 300 }}
    />
  );
}
