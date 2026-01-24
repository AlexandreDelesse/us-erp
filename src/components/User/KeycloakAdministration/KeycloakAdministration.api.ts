import { keycloakApi } from "../../../api/client";
import type { EnableUserCmd } from "../../../Keycloak/KcUser";

export const getKeycloakUsers = async () =>
  (await keycloakApi.get("/Users")).data;

export const enableUser = async (cmd: EnableUserCmd) =>
  (
    await keycloakApi.put(
      `Users/${cmd.userId}/enabled`,
      JSON.stringify(cmd.enabled),
    )
  ).data;

export const updateEmailVerified = async (cmd: EnableUserCmd) =>
  (
    await keycloakApi.put(
      `Users/${cmd.userId}/emailVerified`,
      JSON.stringify(cmd.enabled),
    )
  ).data;
