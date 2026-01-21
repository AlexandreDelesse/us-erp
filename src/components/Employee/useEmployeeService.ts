import { useQuery } from "@tanstack/react-query";
import { getEmployees } from "./Employee.api";

export default function useEmployeeService() {
  const EmployeeQry = useQuery({
    queryKey: ["employees"],
    queryFn: () => getEmployees(),
  });

  const employees = EmployeeQry.data ?? [];

  return { employees, EmployeeQry };
}
