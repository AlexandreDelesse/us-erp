import {
  Autocomplete,
  Skeleton,
  TextField,
  type AutocompleteProps,
} from "@mui/material";
import ErrorHandler from "../Utils/Error/ErrorHandler";
import { useState } from "react";
import type { Employee } from "./Employee";
import useEmployeeService from "./useEmployeeService";

export default function EmployeesAutocomplete(
  props: Partial<AutocompleteProps<Employee, false, false, false>>,
) {
  const [inputValue, setInputValue] = useState("");

  const { EmployeeQry } = useEmployeeService();

  const filterOptions = (opts: Employee[]) =>
    inputValue
      ? opts.filter((opt) =>
          opt.nom.toLowerCase().includes(inputValue.toLowerCase()),
        )
      : [];

  if (EmployeeQry.isLoading) return <Skeleton variant="text" width={200} />;
  if (EmployeeQry.isError) return <ErrorHandler error={EmployeeQry.error} />;

  const employees = EmployeeQry.data ?? [];

  return (
    <Autocomplete
      {...props}
      options={employees}
      onInputChange={(_e, value) => setInputValue(value)}
      renderInput={(params) => (
        <TextField sx={{ minWidth: "150px" }} {...params} label="Personnel" />
      )}
      size="small"
      getOptionLabel={(u) => u.nom}
      getOptionKey={(u) => u.id}
      filterOptions={filterOptions}
      noOptionsText="Aucun utilisateur"
    />
  );
}
