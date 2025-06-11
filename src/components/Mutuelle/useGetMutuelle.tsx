import { useQuery } from "@tanstack/react-query";
import { getMutuelles } from "./Mutuelle.service";
import type { Mutuelle } from "./Mutuelle.model";

export default function useGetMutuelle() {
  const query = useQuery<Mutuelle[], Error>({
    queryKey: ["mutuelles"],
    queryFn: getMutuelles,
  });

  return query;
}
