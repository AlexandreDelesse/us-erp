import LogoLoader from "../Utils/LogoLoader";
import ErrorHandler from "../Utils/Error/ErrorHandler";
import useGetMutuelle from "../Mutuelle/useGetMutuelle";
import { Autocomplete, TextField } from "@mui/material";
import type { Mutuelle } from "../Mutuelle/Mutuelle.model";

interface MutuelleAutocompleteProps {
  value: Mutuelle | null;
  onChange: (value: Mutuelle | null) => void;
}
export default function MutuelleAutocomplete(props: MutuelleAutocompleteProps) {
  const mutuellesQry = useGetMutuelle();

  if (mutuellesQry.isLoading) return <LogoLoader />;

  if (mutuellesQry.isError) return <ErrorHandler error={mutuellesQry.error} />;
  return (
    <Autocomplete
      disablePortal
      options={mutuellesQry.data ?? []}
      sx={{ width: 300 }}
      value={props.value}
      renderInput={(params) => (
        <TextField {...params} size="small" label="Mutuelle" />
      )}
      onChange={(_e, v) => props.onChange(v)}
      getOptionLabel={(option) => option.name}
      getOptionKey={(option) => option.amc}
    />
  );
}
