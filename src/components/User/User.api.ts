import { regulApi } from "../../api/client";
import type { ContextKey } from "../Employee/AutocompleteStrategy";
import type { MapUserCmd, MapUserDto, UsUserDto } from "./User";

export const getUsers = async (): Promise<UsUserDto[]> =>
  (await regulApi.get(`/Users/App/${"regulation"}`)).data;

export const getUsersMap = async (): Promise<MapUserDto[]> =>
  (await regulApi.get(`/Users/Map`)).data;

export const mapUser = async (
  cmd: MapUserCmd & { application: ContextKey },
) => {
  const { application, ...rest } = cmd;
  return (await regulApi.post(`Users/Map/${application}`, rest)).data;
};

export const deleteUserMap = async (mapId: number) =>
  (await regulApi.delete(`/Users/Map/${mapId}`)).data;
