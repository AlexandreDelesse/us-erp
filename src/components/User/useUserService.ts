import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteUserMap, getUsers, getUsersMap, mapUser } from "./User.api";
import { enqueueSnackbar } from "notistack";

export default function useUserService() {
  const userQry = useQuery({
    queryKey: ["users", 1],
    queryFn: () => getUsers("1"),
  });

  const users = userQry.data ?? [];

  const usersMapQry = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsersMap(),
  });

  const usersMap = usersMapQry.data ?? [];

  const mapUserCmd = useMutation({
    mutationKey: ["users"],
    mutationFn: mapUser,
    onSuccess: () => enqueueSnackbar("All good", { variant: "success" }),
    onError: () => enqueueSnackbar("Goes wrong", { variant: "error" }),
  });

  const deleteUserMapCmd = useMutation({
    mutationKey: ["users"],
    mutationFn: (mapId: number) => deleteUserMap(mapId),
    onSuccess: () => enqueueSnackbar("All good", { variant: "success" }),
    onError: () => enqueueSnackbar("Goes wrong", { variant: "error" }),
  });

  const userMapMap = new Map<number, string>(
    users.map((u) => [u.EmployeeId, u.EmployeeLabel])
  );

  const getUserName = (id: number) => userMapMap.get(id);

  return { userQry, mapUserCmd, deleteUserMapCmd, usersMapQry, getUserName };
}
