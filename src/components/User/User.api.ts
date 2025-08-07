import { regulApi } from "../../api/client";
import type { MapUserCmd, MapUserDto, UsUserDto } from "./User";

export const getUsers = async (_appId: string): Promise<UsUserDto[]> =>
  (await regulApi.get(`/Users/App/${"regulation"}`)).data;

export const getUsersMap = async (): Promise<MapUserDto[]> =>
  (await regulApi.get(`/Users/Map`)).data;

export const mapUser = async (cmd: MapUserCmd) =>
  (await regulApi.post(`Users/Map/${"regulation"}`, cmd)).data;

export const deleteUserMap = async (mapId: number) =>
  (await regulApi.delete(`/Users/Map/${mapId}`)).data;
