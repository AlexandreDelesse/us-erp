import LogoLoader from "../Utils/LogoLoader";
import ErrorHandler from "../Utils/Error/ErrorHandler";
import { Autocomplete, TextField } from "@mui/material";
import type { Mutuelle } from "../Mutuelle/Mutuelle.model";
import useGetConcentrateur from "./useGetConcentrateur";

interface MutuelleAutocompleteProps {
  value: Mutuelle | null;
  onChange: (value: Mutuelle | null) => void;
}
export default function ConcentrateurAutocomplete(
  props: MutuelleAutocompleteProps
) {
  const concentrateurQry = useGetConcentrateur();

  if (concentrateurQry.isLoading) return <LogoLoader />;

  if (concentrateurQry.isError)
    return <ErrorHandler error={concentrateurQry.error} />;
  return (
    <Autocomplete
      disablePortal
      options={concentrateurQry.data ?? []}
      sx={{ width: 300 }}
      value={props.value}
      renderInput={(params) => (
        <TextField {...params} size="small" label="Concentrateur" />
      )}
      onChange={(_e, v) => props.onChange(v)}
      getOptionLabel={(option) => option.name}
      getOptionKey={(option) => option.amc}
    />
  );
}
