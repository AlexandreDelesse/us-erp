import { useMutation } from "@tanstack/react-query";
import type { Mutuelle } from "./Mutuelle.model";
import { deleteMutuelle, postMutuelle } from "./Mutuelle.service";
import { queryClient } from "../../queryClient";
import LogoLoader from "../Utils/LogoLoader";
import ErrorHandler from "../Utils/Error/ErrorHandler";
import { Box } from "@mui/material";
import useGetMutuelle from "./useGetMutuelle";
import CrudDataGrid from "../Utils/Grid/CrudDataGrid";
import type { GridColDef } from "@mui/x-data-grid";

export default function MutuelleContainer() {
  const query = useGetMutuelle();

  const mutation = useMutation({
    mutationKey: ["mutuelles"],
    mutationFn: (amc: string) => deleteMutuelle(amc),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mutuelles"] });
    },
  });

  const addMutation = useMutation({
    mutationKey: ["mutuelles"],
    mutationFn: (m: Mutuelle) => postMutuelle(m),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["mutuelles"] }),
  });

  const handleDelete = (m: Mutuelle) => mutation.mutate(m.amc);
  const handleCreate = (m: Mutuelle) => addMutation.mutate(m);

  if (query.isLoading) return <LogoLoader />;
  if (query.isError) return <ErrorHandler error={query.error} />;

  // Query.data is valid here
  const cols: GridColDef[] = [
    { field: "id", width: 70 },
    { field: "amc", width: 200, editable: true },
    { field: "name", width: 200, editable: true },
  ];

  const processRowUpdate = async (newRow: Mutuelle) => {
    handleCreate(newRow);

    return newRow;
  };

  const defaultValue: Mutuelle = { amc: "", name: "" };

  return (
    <Box display={"flex"} gap={2} justifyContent={"space-between"}>
      <CrudDataGrid
        defaultValue={defaultValue}
        rows={query.data?.map((m, i) => ({ ...m, id: i })) ?? []}
        columns={cols}
        processRowUpdate={processRowUpdate}
        onDelete={handleDelete}
        onSave={handleCreate}
        title="Mutuelles"
      />
    </Box>
  );
}
