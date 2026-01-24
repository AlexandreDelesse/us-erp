import type { KcUserDto } from "../../Keycloak/KcUser";
import type { Employee } from "../Employee/Employee";
import type { User } from "./User";

export const mergeUsers = (
  kcUsers: KcUserDto[],
  domainUsers: Employee[],
): User[] => {
  const alreadyRegistered: User[] = domainUsers
    .filter((u) => !!u.keycloakId && kcUsers.find((k) => k.id == u.keycloakId))
    .map((u) => ({
      email: "",
      firstname: u.prenom,
      lastname: u.nom,
      keycloakId: u.keycloakId,
      userId: u.id,
      userRef: getUserRef(u.keycloakId, u.id),
    }));
  const notRegistered: User[] = domainUsers
    .filter((u) => !u.keycloakId)
    .map((u) => ({
      email: "",
      firstname: u.prenom,
      lastname: u.nom,
      keycloakId: u.keycloakId,
      userId: u.id,
      userRef: getUserRef(u.keycloakId, u.id),
    }));
  const kcFiltered: User[] = kcUsers
    .filter((u) => !alreadyRegistered.map((u) => u.keycloakId).includes(u.id))
    .map((u) => ({
      email: u.email,
      keycloakId: u.id,
      firstname: u.firstName,
      lastname: u.lastName,
      emailVerified: u.emailVerified,
      enabled: u.enabled,
      userRef: getUserRef(u.id, undefined),
    }));

  const users: User[] = [...alreadyRegistered, ...notRegistered, ...kcFiltered];

  return users;
};

export const getUserRef = (kcId?: string, uId?: number) => {
  if (kcId && uId) return `ENROLLED:${kcId}:${uId}`;
  if (kcId) return `KC:${kcId}`;
  return `US:${uId}`;
};
