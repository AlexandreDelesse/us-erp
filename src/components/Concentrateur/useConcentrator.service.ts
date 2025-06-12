import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../queryClient";

import { useSnackbar } from "notistack";
import type { Concentrateur } from "./Concentrateur.model";
import {
  deleteConcentrator,
  getConcentrator,
  postConcentrator,
  putConcentrator,
} from "./Concentrator.api";

export const emptyConcentrator: Concentrateur = {
  AmcId: "",
  AmoId: "",
  Id: -1,
  AmoEnd: "",
  AmoStart: "",
};

export function useCreateConcentrator() {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationKey: ["concentrators"],
    mutationFn: (cmd: Concentrateur) => postConcentrator(cmd),
    onSuccess: () => {
      enqueueSnackbar("Concentrateur ajouté", { variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["concentrators"] });
    },
  });
}

export function useGetConcentrator() {
  return useQuery<Concentrateur[], Error>({
    queryKey: ["concentrators"],
    queryFn: getConcentrator,
  });
}

export function useUpdateConcentrator() {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationKey: ["concentrators"],
    mutationFn: (mutuelle: Concentrateur) => putConcentrator(mutuelle),
    onSuccess: () => {
      enqueueSnackbar("Concentrateur ajouté", { variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["concentrators"] });
    },
  });
}

export function useDeleteConcentrator() {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationKey: ["concentrators"],
    mutationFn: (id: number) => deleteConcentrator(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["concentrators"] });
    },

    onError: (_err) =>
      enqueueSnackbar("Suppression non implémenté", { variant: "error" }),
  });
}
