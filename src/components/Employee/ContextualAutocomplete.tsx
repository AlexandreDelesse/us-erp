import { useState } from "react";
import type { AutocompleteOption, ContextKey } from "./AutocompleteStrategy";
import {
  Autocomplete,
  Skeleton,
  TextField,
  type AutocompleteProps,
} from "@mui/material";
import useAutocompleteOptions from "./useAutocompleteOptions";
import ErrorHandler from "../Utils/Error/ErrorHandler";

interface Props {
  context: ContextKey;
  autocompleteProps: Partial<
    AutocompleteProps<AutocompleteOption, false, false, false>
  >;
}

function ContextualAutocomplete(props: Props) {
  const { context, autocompleteProps } = props;

  const [inputValue, setInputValue] = useState("");

  const {
    data: options,
    isLoading,
    isError,
    error,
  } = useAutocompleteOptions({
    context,
  });

  const filterOptions = (opts: AutocompleteOption[]) =>
    inputValue
      ? opts.filter((opt) =>
          opt.label.toLowerCase().includes(inputValue.toLowerCase()),
        )
      : [];

  if (isLoading) return <Skeleton variant="text" width={"100%"} />;
  if (isError) return <ErrorHandler error={error} />;

  return (
    <Autocomplete
      {...autocompleteProps}
      options={options}
      onInputChange={(_e, value) => setInputValue(value)}
      renderInput={(params) => (
        <TextField sx={{ minWidth: "150px" }} {...params} label="User" />
      )}
      size="small"
      getOptionLabel={(u) => u.label}
      getOptionKey={(u) => u.id}
      filterOptions={filterOptions}
      noOptionsText="Aucun utilisateur"
    />
  );
}

export default ContextualAutocomplete;
