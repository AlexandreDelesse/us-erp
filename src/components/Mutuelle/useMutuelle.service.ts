import { useMutation, useQuery } from "@tanstack/react-query";
import type { Mutuelle, MutuelleCmd } from "./Mutuelle.model";
import { queryClient } from "../../queryClient";
import {
  deleteMutuelle,
  getMutuelle,
  postMutuelle,
  putMutuelle,
} from "./Mutuelle.api";
import { useSnackbar } from "notistack";
import { useMemo } from "react";

export const emptyMutuelle: Mutuelle = {
  AMC: "",
  Name: "",
  IsConcentrator: false,
  TeletransNumber: "",
  ID: 0,
};

export const emptyConcentrator: Mutuelle = {
  AMC: "",
  Name: "",
  IsConcentrator: true,
  TeletransNumber: "",
  ID: 0,
};

export function useCreateMutuelle() {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationKey: ["mutuelles"],
    mutationFn: (cmd: MutuelleCmd) => postMutuelle(cmd),
    onSuccess: () => {
      enqueueSnackbar("Mutuelle ajouté", { variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["mutuelles"] });
    },
  });
}

export function useGetMutuelle() {
  return useQuery<Mutuelle[], Error>({
    queryKey: ["mutuelles"],
    queryFn: getMutuelle,
  });
}

export function useUpdateMutuelle() {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationKey: ["mutuelles"],
    mutationFn: (mutuelle: Mutuelle) => putMutuelle(mutuelle),
    onSuccess: () => {
      enqueueSnackbar("Mutuelle ajouté", { variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["mutuelles"] });
    },
  });
}

export function useDeleteMutuelle() {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationKey: ["mutuelles"],
    mutationFn: (id: number) => deleteMutuelle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mutuelles"] });
    },

    onError: () =>
      enqueueSnackbar("Suppression non implémenté", { variant: "error" }),
  });
}

export function useMutuelleNameMap() {
  const { data: mutuelles = [] } = useGetMutuelle();

  return useMemo(() => {
    return new Map(mutuelles.map((m) => [m.ID, m.Name]));
  }, [mutuelles]);
}
