import {
  Autocomplete,
  Skeleton,
  TextField,
  type AutocompleteProps,
} from "@mui/material";
import useUserService from "./useUserService";
import ErrorHandler from "../Utils/Error/ErrorHandler";
import { useState } from "react";
import type { UsUserDto } from "./User";

export default function UsersAutocomplete(
  props: Partial<AutocompleteProps<UsUserDto, false, false, false>>
) {
  const [inputValue, setInputValue] = useState("");

  const { userQry } = useUserService();

  const filterOptions = (opts: UsUserDto[]) =>
    inputValue
      ? opts.filter((opt) =>
          opt.EmployeeLabel.toLowerCase().includes(inputValue.toLowerCase())
        )
      : [];

  if (userQry.isLoading) return <Skeleton variant="text" width={200} />;
  if (userQry.isError) return <ErrorHandler error={userQry.error} />;

  const users = userQry.data ?? [];

  return (
    <Autocomplete
      {...props}
      options={users}
      onInputChange={(_e, value) => setInputValue(value)}
      renderInput={(params) => (
        <TextField sx={{ minWidth: "150px" }} {...params} label="User" />
      )}
      size="small"
      getOptionLabel={(u) => u.EmployeeLabel}
      getOptionKey={(u) => u.EmployeeId}
      filterOptions={filterOptions}
      noOptionsText="Aucun utilisateur"
    />
  );
}
