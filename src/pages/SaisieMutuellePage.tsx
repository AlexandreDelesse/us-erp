import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteMutuelle,
  getMutuelles,
} from "../components/Mutuelle/Mutuelle.service";
import LogoLoader from "../components/Utils/LogoLoader";
import ErrorHandler from "../components/Utils/Error/ErrorHandler";
import type { Mutuelle } from "../components/Mutuelle/Mutuelle.model";
import MutuelleTable from "../components/Mutuelle/MutuelleTable";
import MutuelleForm from "../components/Mutuelle/MutuelleForm";
import { queryClient } from "../queryClient";

export default function SaisieMutuellePage() {
  const query = useQuery<Mutuelle[], Error>({
    queryKey: ["mutuelles"],
    queryFn: getMutuelles,
  });

  const mutation = useMutation({
    mutationKey: ["mutuelles"],
    mutationFn: (amc: string) => deleteMutuelle(amc),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["mutuelles"] }),
  });

  const onDelete = (amc: string) => mutation.mutate(amc);

  if (query.isLoading) return <LogoLoader />;
  if (query.isError) return <ErrorHandler error={query.error} />;

  return (
    <>
      <MutuelleForm />
      <MutuelleTable mutuelles={query.data ?? []} onDelete={onDelete} />
    </>
  );
}
