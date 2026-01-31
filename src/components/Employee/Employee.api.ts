import { rhApi } from "../../api/client";
import type { Employee } from "./Employee";

// export const getEmployees = async (): Promise<Employee[]> => {
//   const promiseData = await Promise.resolve([
//     {
//       id: 4,
//       nom: "ALARCON",
//       prenom: "Vanessa",
//       dateNaissance: "1971-04-03T00:00:00",
//     },
//     {
//       id: 5,
//       nom: "BOULET",
//       prenom: "Jean marie",
//       dateNaissance: "1951-12-31T00:00:00",
//     },
//     {
//       id: 6,
//       nom: "BERNARD",
//       prenom: "Isabelle",
//       dateNaissance: "1969-08-29T00:00:00",
//     },
//   ]);

//   return promiseData;
// };
export const getEmployees = async (): Promise<Employee[]> =>
  (await rhApi.get(`Employee`)).data;

export interface MapEmployeeCmd {
  keyCloackId: string;
  employeeId: number;
}

export const mapEmployeeAndKc = async (cmd: MapEmployeeCmd) => {
  return await rhApi.put("api/mapping", cmd);
};

export interface CreateEmployee {
  name: string;
  firstName: string;
  email: string;
}

export const createEmployee = async (cmd: CreateEmployee) => {
  return await rhApi.post("/Employee", cmd);
};
