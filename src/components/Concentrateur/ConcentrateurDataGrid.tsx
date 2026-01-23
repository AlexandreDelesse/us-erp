import { useEffect, useState } from "react";
import type { Concentrateur } from "./Concentrateur.model";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import EditToolbar from "../Mutuelle/EditToolbar";
import RenderMutuelleEditCell from "../Mutuelle/RenderMutuelleEditCell";
import { useMutuelleNameMap } from "../Mutuelle/useMutuelle.service";
import { useSnackbar } from "notistack";

interface ConcentrateurDataGridProps {
  concentrateurs: Concentrateur[];
  onDelete: (id: number) => void;
  onUpdate: (c: Concentrateur) => Promise<void>;
  onCreate: (c: Concentrateur) => Promise<void>;
  title?: string;
  emptyModel: Concentrateur;
}
export default function ConcentrateurDataGrid(
  props: ConcentrateurDataGridProps,
) {
  const { enqueueSnackbar } = useSnackbar();
  const [rows, setRows] = useState<(Concentrateur & { isNew?: boolean })[]>(
    props.concentrateurs,
  );
  const [rowModeModels, setRowModeModels] = useState({});

  useEffect(() => setRows(props.concentrateurs), [props.concentrateurs]);
  const mutuelleNameMap = useMutuelleNameMap();

  const handleAddRow = () => {
    if (rows.some((c) => !c.AmcId || !c.AmoId)) return;
    const newId = rows.length > 0 ? Math.max(...rows.map((r) => r.Id)) + 1 : 0;
    const newRow: Concentrateur & { isNew: boolean } = {
      ...props.emptyModel,
      Id: newId,
      isNew: true,
    };
    setRows((prev) => [newRow, ...prev]);
  };

  const processRowUpdate = async (
    newRow: Concentrateur & { isNew?: boolean },
  ) => {
    console.log("new row process", newRow);
    if (!newRow.AmcId || !newRow.AmoId || !newRow.AmoStart)
      throw new Error("Remplissez tous les champs");

    try {
      if (newRow.isNew) {
        const { ...r } = newRow;
        r.Id = 0;
        r.AmoEnd = r.AmoEnd == "" ? null : r.AmoEnd;
        await props.onCreate(r);
      } else {
        const { ...r } = newRow;
        r.AmoEnd = r.AmoEnd == "" ? null : r.AmoEnd;
        await props.onUpdate(r);
      }
      // Remet la ligne dans l’état "non nouveau"
      setRows((prev) =>
        prev.map((r) => (r.Id === newRow.Id ? { ...newRow, isNew: false } : r)),
      );
      return newRow;
    } catch (error) {
      console.log("error in process", error);
      throw error;
    }
  };

  const columns: GridColDef[] = [
    {
      field: "AmoId",
      headerName: "Mutuelle",
      width: 200,
      editable: true,
      flex: 1,
      renderEditCell: (params) => RenderMutuelleEditCell(params, false),
      renderCell: (params) => mutuelleNameMap.get(params.value) ?? params.value,
    },
    {
      field: "AmcId",
      headerName: "Concentrateur",
      width: 200,
      editable: true,
      flex: 1,
      renderEditCell: (params) => RenderMutuelleEditCell(params, true),
      renderCell: (params) => mutuelleNameMap.get(params.value) ?? params.value,
    },
    {
      field: "AmoStart",
      editable: true,
      type: "date",
      width: 100,
      flex: 0.5,
      valueGetter: (value) => (value ? new Date(value) : value),
    },
    {
      field: "AmoEnd",
      editable: true,
      type: "date",
      width: 100,
      flex: 0.5,
      valueGetter: (value) => (value ? new Date(value) : value),
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
      onProcessRowUpdateError={(e: Error) =>
        enqueueSnackbar(e.message, { variant: "error" })
      }
      showToolbar
      getRowId={(row: Concentrateur) => row.Id}
      editMode="row"
      sx={{ minHeight: 300 }}
    />
  );
}
