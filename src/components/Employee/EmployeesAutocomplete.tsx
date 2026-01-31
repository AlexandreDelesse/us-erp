import {
  Autocomplete,
  MenuItem,
  Skeleton,
  TextField,
  type AutocompleteProps,
} from "@mui/material";
import ErrorHandler from "../Utils/Error/ErrorHandler";
import { useState } from "react";
import type { Employee } from "./Employee";
import useEmployeeService from "./useEmployeeService";

export default function EmployeesAutocomplete(
  props: Partial<AutocompleteProps<Employee, false, false, false>> & {
    onNoOptionClick: () => void;
  },
) {
  const [inputValue, setInputValue] = useState("");

  const { EmployeeQry } = useEmployeeService();

  const filterOptions = (opts: Employee[]) =>
    inputValue
      ? opts.filter((opt) =>
          opt.fullName.toLowerCase().includes(inputValue.toLowerCase()),
        )
      : [];

  const handleNoOptionClick = () => {
    props.onNoOptionClick();
  };

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
      getOptionLabel={(u) => u.fullName}
      getOptionKey={(u) => u.employeeId}
      filterOptions={filterOptions}
      noOptionsText={
        <MenuItem onClick={handleNoOptionClick}>Créer utilisateur</MenuItem>
      }
    />
  );
}
