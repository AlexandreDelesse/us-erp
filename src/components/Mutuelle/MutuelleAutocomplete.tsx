import LogoLoader from "../Utils/LogoLoader";
import ErrorHandler from "../Utils/Error/ErrorHandler";

import { Autocomplete, TextField } from "@mui/material";
import type { Mutuelle } from "./Mutuelle.model";
import { useGetMutuelle } from "./useMutuelle.service";

interface MutuelleAutocompleteProps {
  value: number | null;
  onChange: (value: Mutuelle | null) => void;
  isConcentrator?: boolean;
}
export default function MutuelleAutocomplete(props: MutuelleAutocompleteProps) {
  const mutuellesQry = useGetMutuelle();

  if (mutuellesQry.isLoading) return <LogoLoader />;
  if (mutuellesQry.isError) return <ErrorHandler error={mutuellesQry.error} />;

  const mutuelle = mutuellesQry.data?.find((m) => m.ID == props.value);
  return (
    <Autocomplete
      disablePortal
      options={
        mutuellesQry.data?.filter(
          (m) => m.IsConcentrator == props.isConcentrator
        ) ?? []
      }
      sx={{ width: 300 }}
      value={mutuelle}
      renderInput={(params) => <TextField {...params} variant="outlined"/>}
      onChange={(_e, v) => props.onChange(v)}
      getOptionLabel={(option) => option.Name}
      getOptionKey={(option) => option.AMC}
    />
  );
}
