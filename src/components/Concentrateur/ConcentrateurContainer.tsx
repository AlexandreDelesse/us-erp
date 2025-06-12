import LogoLoader from "../Utils/LogoLoader";
import ErrorHandler from "../Utils/Error/ErrorHandler";

import ConcentrateurDataGrid from "./ConcentrateurDataGrid";
import type { Concentrateur } from "./Concentrateur.model";
import {
  emptyConcentrator,
  useCreateConcentrator,
  useDeleteConcentrator,
  useGetConcentrator,
  useUpdateConcentrator,
} from "./useConcentrator.service";

export default function ConcentrateurContainer() {
  const query = useGetConcentrator();
  const deleteMutation = useDeleteConcentrator();
  const createMutation = useCreateConcentrator();
  const updateMutation = useUpdateConcentrator();

  const handleDelete = (id: number) => deleteMutation.mutate(id);
  const handleCreate = async (c: Concentrateur) => await createMutation.mutateAsync(c);
  const handleUpdate = async (c: Concentrateur) => await updateMutation.mutateAsync(c);

  if (query.isLoading) return <LogoLoader />;
  if (query.isError) return <ErrorHandler error={query.error} />;

  return (
    <ConcentrateurDataGrid
      concentrateurs={query.data || []}
      onCreate={handleCreate}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
      title="Concentrateurs"
      emptyModel={emptyConcentrator}
    />
  );
}
