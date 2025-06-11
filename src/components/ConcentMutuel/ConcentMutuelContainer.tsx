import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteConcentMutuel,
  getConcentMutuels,
  postConcentMutuel,
} from "./ConcentMutuel.service";
import LogoLoader from "../Utils/LogoLoader";
import ErrorHandler from "../Utils/Error/ErrorHandler";
import CrudDataGrid from "../Utils/Grid/CrudDataGrid";
import type { ConcentMutuel } from "./ConcentMutuel.model";
import type { GridColDef } from "@mui/x-data-grid";
import RenderMutuelleEditCell from "./RenderMutuelleEditCell";
import { queryClient } from "../../queryClient";
import type { Mutuelle } from "../Mutuelle/Mutuelle.model";
import type { Concentrateur } from "../Concentrateur/Consentrateur.model";
import RenderConcentrateurEditCell from "../Concentrateur/RenderConcentrateurEditCell";

export default function ConcentMutuelContainer() {
  const query = useQuery({
    queryKey: ["concentmutuelle"],
    queryFn: () => getConcentMutuels(),
  });

  const mutation = useMutation({
    mutationKey: ["concentmutuelle"],
    mutationFn: (amc: string) => deleteConcentMutuel(amc),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["concentmutuelle"] });
    },
  });

  const addMutation = useMutation({
    mutationKey: ["concentmutuelle"],
    mutationFn: (m: ConcentMutuel) => postConcentMutuel(m),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["concentmutuelle"] }),
  });

  if (query.isLoading) return <LogoLoader />;
  if (query.isError) return <ErrorHandler error={query.error} />;

  const cols: GridColDef[] = [
    { field: "id", width: 70 },
    {
      field: "mutuelle",
      width: 200,
      editable: true,
      valueFormatter: (value: Mutuelle) => (value ? value.name : ""),

      renderEditCell: (params) => RenderMutuelleEditCell(params),
    },
    {
      field: "concentrateur",
      width: 200,
      editable: true,
      valueFormatter: (value: Concentrateur) => (value ? value.name : ""),

      renderEditCell: (params) => RenderConcentrateurEditCell(params),
    },
    {
      field: "start",
      type: "date",
      width: 200,
      editable: true,
      valueGetter: (value: string) => (value ? new Date(value) : ""),
    },
    {
      field: "end",
      type: "date",
      width: 200,
      editable: true,
      valueGetter: (value: string) => (value ? new Date(value) : ""),
    },
  ];

  const handleDelete = (m: ConcentMutuel) =>
    mutation.mutate(m.concentrateur!.amc);

  const handleCreate = (m: ConcentMutuel) => addMutation.mutate(m);

  const processRowUpdate = async (newRow: ConcentMutuel) => {
    console.log("processRowUpdate : ", newRow);
    newRow.start = new Date(newRow.start).toISOString();

    handleCreate(newRow);
    return newRow;
  };

  const defaultValue: ConcentMutuel = { start: "", end: "" };

  return (
    <>
      <CrudDataGrid
        defaultValue={defaultValue}
        rows={
          query.data?.map((m: ConcentMutuel, i: number) => ({ ...m, id: i })) ??
          []
        }
        columns={cols}
        processRowUpdate={processRowUpdate}
        onDelete={handleDelete}
        onSave={handleCreate}
        title="Liens Mutuelle - Concentrateur"
      />
    </>
  );
}
