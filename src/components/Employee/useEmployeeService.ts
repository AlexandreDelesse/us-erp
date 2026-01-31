import { useMutation, useQuery } from "@tanstack/react-query";
import { createEmployee, getEmployees, mapEmployeeAndKc } from "./Employee.api";
import { enqueueSnackbar } from "notistack";
import { queryClient } from "../../queryClient";

export default function useEmployeeService() {
  const EmployeeQry = useQuery({
    queryKey: ["employees"],
    queryFn: () => getEmployees(),
  });

  const mapEmployeeMutation = useMutation({
    mutationKey: ["mapEmployee"],
    mutationFn: mapEmployeeAndKc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      enqueueSnackbar("All good", { variant: "success" });
    },
    onError: () => enqueueSnackbar("All bad", { variant: "error" }),
  });

  const createEmployeeMutation = useMutation({
    mutationKey: ["employees"],
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      enqueueSnackbar("All good", { variant: "success" });
    },
    onError: () => enqueueSnackbar("All bad", { variant: "error" }),
  });

  const employees = EmployeeQry.data ?? [];

  return {
    employees,
    EmployeeQry,
    mapEmployeeMutation,
    createEmployeeMutation,
  };
}
