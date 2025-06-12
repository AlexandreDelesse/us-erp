import type { Mutuelle, MutuelleCmd } from "./Mutuelle.model";
import {
  emptyConcentrator,
  emptyMutuelle,
  useCreateMutuelle,
  useDeleteMutuelle,
  useGetMutuelle,
  useUpdateMutuelle,
} from "./useMutuelle.service";
import LogoLoader from "../Utils/LogoLoader";
import ErrorHandler from "../Utils/Error/ErrorHandler";
import MutuelleDataGrid from "./MutuelleDataGrid";

interface MutuelleContainerProps {
  isConcentrator?: boolean;
}
export default function MutuelleContainer(props: MutuelleContainerProps) {
  const query = useGetMutuelle();
  const deleteMutation = useDeleteMutuelle();
  const createMutation = useCreateMutuelle();
  const updateMutation = useUpdateMutuelle();

  const handleDelete = (id: number) => deleteMutation.mutate(id);
  const handleCreate = async (m: MutuelleCmd) =>await createMutation.mutateAsync(m);
  const handleUpdate = async (m: Mutuelle) =>await updateMutation.mutateAsync(m);

  if (query.isLoading) return <LogoLoader />;
  if (query.isError) return <ErrorHandler error={query.error} />;

  // Query.data is valid here
  return (
    <MutuelleDataGrid
      mutuelles={
        query.data?.filter((m) => m.IsConcentrator == !!props.isConcentrator) ||
        []
      }
      onCreate={handleCreate}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
      title={props.isConcentrator ? "Concentrateurs" : "Mutuelles"}
      emptyModel={props.isConcentrator ? emptyConcentrator : emptyMutuelle}
    />
  );
}
