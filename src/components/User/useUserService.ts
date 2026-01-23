import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteUserMap, getUsers, getUsersMap, mapUser } from "./User.api";
import { getKeycloakUsers } from "../../Keycloak/Keycloak.api";
import { enqueueSnackbar } from "notistack";
import { queryClient } from "../../queryClient";
import { getEmployees } from "../Employee/Employee.api";
import { mergeUsers } from "./User.tools";

export default function useUserService() {
  const userQry = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const domainUsers = (await getEmployees()).map((u) => ({
        ...u,
        keycloakId: "",
      }));
      const kcUsers = await getKeycloakUsers();
      const users = mergeUsers(kcUsers, domainUsers);
      return users;
    },
  });

  const users = userQry.data ?? [];

  const usersMapQry = useQuery({
    queryKey: ["userMaps"],
    queryFn: () => getUsersMap(),
  });

  const mapUserCmd = useMutation({
    mutationKey: ["users"],
    mutationFn: mapUser,
    onSuccess: () => enqueueSnackbar("All good", { variant: "success" }),
    onError: () => enqueueSnackbar("Goes wrong", { variant: "error" }),
  });

  const deleteUserMapCmd = useMutation({
    mutationKey: ["users"],
    mutationFn: (mapId: number) => deleteUserMap(mapId),
    onSuccess: () => {
      enqueueSnackbar("All good", { variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["userMaps"] });
    },
    onError: () => enqueueSnackbar("Goes wrong", { variant: "error" }),
  });

  // const userMapMap = new Map<number, string>(
  //   users.map((u) => [u.EmployeeId, u.EmployeeLabel]),
  // );

  const getUserName = (id: number) => "";

  return {
    userQry,
    users,
    mapUserCmd,
    deleteUserMapCmd,
    usersMapQry,
    getUserName,
  };
}
