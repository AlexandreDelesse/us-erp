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
      displayName: u.fullName,
      firstname: u.fullName.split(" ")[1],
      lastname: u.fullName.split(" ")[0],
      keycloakId: u.keycloakId,
      userId: u.employeeId,
      userRef: getUserRef(u.keycloakId, u.employeeId),
    }));
  const notRegistered: User[] = domainUsers
    .filter((u) => !u.keycloakId)
    .map((u) => ({
      email: "",
      displayName: u.fullName,
      keycloakId: u.keycloakId,
      firstname: u.fullName.split(" ")[1],
      lastname: u.fullName.split(" ")[0],
      userId: u.employeeId,
      userRef: getUserRef(u.keycloakId, u.employeeId),
    }));
  const kcFiltered: User[] = kcUsers
    .filter((u) => !alreadyRegistered.map((u) => u.keycloakId).includes(u.id))
    .map((kcu) => ({
      email: kcu.email,
      keycloakId: kcu.id,
      firstname: kcu.firstName,
      lastname: kcu.lastName,
      displayName: `${kcu.lastName.toUpperCase()} ${kcu.firstName}`,
      emailVerified: kcu.emailVerified,
      enabled: kcu.enabled,
      userRef: getUserRef(kcu.id, undefined),
    }));

  const users: User[] = [...alreadyRegistered, ...notRegistered, ...kcFiltered];

  return users;
};

export const getUserRef = (kcId?: string, uId?: number) => {
  if (kcId && uId) return `ENROLLED:${kcId}:${uId}`;
  if (kcId) return `KC:${kcId}`;
  return `US:${uId}`;
};
