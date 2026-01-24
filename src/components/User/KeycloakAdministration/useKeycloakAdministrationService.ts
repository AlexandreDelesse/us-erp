import { useMutation } from "@tanstack/react-query";
import { enableUser, updateEmailVerified } from "./KeycloakAdministration.api";
import { enqueueSnackbar } from "notistack";
import { queryClient } from "../../../queryClient";


function useKeycloakAdministrationService() {

  const userEmailVerifiedMutation = useMutation({
    mutationKey: ["userAdministration", "emailVerified"],
    mutationFn: updateEmailVerified,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      enqueueSnackbar("Statut utilisateur mis a jour", { variant: "success" });
    },
    onError: () =>
      enqueueSnackbar("Une erreur est survenue", { variant: "error" }),
  });

  const userEnabledMutation = useMutation({
    mutationKey: ["userAdministration", "enable"],
    mutationFn: enableUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      enqueueSnackbar("Statut utilisateur mis a jour", { variant: "success" });
    },
    onError: () =>
      enqueueSnackbar("Une erreur est survenue", { variant: "error" }),
  });

  return { userEmailVerifiedMutation, userEnabledMutation };
}

export default useKeycloakAdministrationService;
