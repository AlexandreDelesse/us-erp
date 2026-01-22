import type { UserQry, UsUserDto } from "../User/User";
import { getUsers } from "../User/User.api";
import type { Employee } from "./Employee";
import { getEmployees } from "./Employee.api";

export type AutocompleteOption = {
  id: string;
  label: string;
};

export type ContextKey = "RH" | "REGULATION";

export type AutocompleteStrategy = {
  fetch: () => Promise<AutocompleteOption[]>;
};

export const strategies: Record<ContextKey, AutocompleteStrategy> = {
  REGULATION: {
    fetch: async () => {
      const users = await getUsers();
      return users.map((u: UsUserDto) => ({
        id: u.EmployeeId.toString(),
        label: u.EmployeeLabel,
      }));
    },
  },
  RH: {
    fetch: async () => {
      const employees = await getEmployees();
      return employees.map((e: Employee) => ({
        id: e.id.toString(),
        label: `${e.nom} ${e.prenom}`,
      }));
    },
  },
};
