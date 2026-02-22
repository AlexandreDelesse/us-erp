import { useMutation } from "@tanstack/react-query";
import { sendNotificationOnUserDevices } from "./NotificationAdministration.api";
import { enqueueSnackbar } from "notistack";

function useNotifyUserDevices() {
  const mutation = useMutation({
    mutationKey: ["NOTIFICATION"],
    mutationFn: sendNotificationOnUserDevices,
    onSuccess: () =>
      enqueueSnackbar("Notifications envoyé !", { variant: "success" }),
    onError: () =>
      enqueueSnackbar("Une erreur est survenue", { variant: "error" }),
  });

  return {
    notifyMutation: mutation,
  };
}

export default useNotifyUserDevices;
