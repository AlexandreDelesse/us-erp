import { useMutation, useQuery } from "@tanstack/react-query";

import { enableUser, getUsers } from "./Keycloak.api";
import type { KcUserDto } from "./KcUser";
import type { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { queryClient } from "../queryClient";

export default function useKeycloakService() {
  const userQuery = useQuery<KcUserDto[], AxiosError>({
    queryKey: ["kcUsers"],
    queryFn: getUsers,
  });

  const userMutation = useMutation({
    mutationKey: ["kcUsers"],
    mutationFn: enableUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kcUsers"] });
      enqueueSnackbar("User enabled", { variant: "success" });
    },
    onError: () =>
      enqueueSnackbar("Une erreur est survenue", { variant: "error" }),
  });

  const kcUserMap = userQuery.data
    ? new Map<string, string>(userQuery.data.map((u) => [u.id, u.username]))
    : new Map<string, string>([]);

  const getKcUserName = (id: string) => kcUserMap.get(id);

  return { userQuery, userMutation, getKcUserName };
}
