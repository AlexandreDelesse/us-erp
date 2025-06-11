import { Box } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../queryClient";
import { deleteMutuelle } from "../Mutuelle/Mutuelle.service";
import LogoLoader from "../Utils/LogoLoader";
import ErrorHandler from "../Utils/Error/ErrorHandler";
import useGetConcentrateur from "./useGetConcentrateur";
import CrudDataGrid from "../Utils/Grid/CrudDataGrid";
import type { Concentrateur } from "./Consentrateur.model";
import type { GridColDef } from "@mui/x-data-grid";
import {
  deleteConcentrateur,
  postConcentrateur,
} from "./Concentrateur.service";

export default function ConcentrateurContainer() {
  const mutation = useMutation({
    mutationKey: ["concentrateurs"],
    mutationFn: (amc: string) => deleteConcentrateur(amc),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["concentrateurs"] });
    },
  });

  const addMutation = useMutation({
    mutationKey: ["concentrateurs"],
    mutationFn: (m: Concentrateur) => postConcentrateur(m),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["concentrateurs"] }),
  });

  const query = useGetConcentrateur();

  const handleDelete = (m: Concentrateur) => mutation.mutate(m.amc);
  const handleCreate = (m: Concentrateur) => addMutation.mutate(m);

  if (query.isLoading) return <LogoLoader />;
  if (query.isError) return <ErrorHandler error={query.error} />;

  const defaultValue: Concentrateur = { amc: "", name: "" };

  const cols: GridColDef[] = [
    { field: "id", width: 70 },
    { field: "amc", width: 200, editable: true },
    { field: "name", width: 200, editable: true },
  ];

  const processRowUpdate = async (newRow: Concentrateur) => {
    handleCreate(newRow);

    return newRow;
  };

  return (
    <Box>
      <Box display={"flex"} gap={2} justifyContent={"space-between"}>
        <CrudDataGrid
          defaultValue={defaultValue}
          rows={query.data?.map((m, i) => ({ ...m, id: i })) ?? []}
          columns={cols}
          processRowUpdate={processRowUpdate}
          onDelete={handleDelete}
          onSave={handleCreate}
          title="Concentrateurs"
        />
      </Box>
    </Box>
  );
}
