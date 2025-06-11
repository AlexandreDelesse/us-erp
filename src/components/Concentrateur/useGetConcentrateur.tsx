import { useQuery } from "@tanstack/react-query";
import { getConcentrateurs } from "./Concentrateur.service";
import type { Concentrateur } from "./Consentrateur.model";

export default function useGetConcentrateur() {
  const query = useQuery<Concentrateur[], Error>({
    queryKey: ["concentrateurs"],
    queryFn: () => getConcentrateurs(),
  });

  return query;
}
