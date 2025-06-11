import { Autocomplete, Box, Button, TextField } from "@mui/material";
import useGetMutuelle from "../Mutuelle/useGetMutuelle";
import LogoLoader from "../Utils/LogoLoader";
import ErrorHandler from "../Utils/Error/ErrorHandler";
import useGetConcentrateur from "../Concentrateur/useGetConcentrateur";
import { useState } from "react";

import type { Mutuelle } from "../Mutuelle/Mutuelle.model";
import type { Concentrateur } from "../Concentrateur/Consentrateur.model";
import { useMutation } from "@tanstack/react-query";
import { postConcentMutuel } from "./ConcentMutuel.service";
import type { ConcentMutuel } from "./ConcentMutuel.model";
import { queryClient } from "../../queryClient";

export default function ConcentMutuelForm() {
  const mutuellesQry = useGetMutuelle();
  const concentrateurQry = useGetConcentrateur();

  const mutation = useMutation({
    mutationKey: ["concentmutuelle"],
    mutationFn: (cm: ConcentMutuel) => postConcentMutuel(cm),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["concentmutuelle"] }),
  });

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [mutuelle, setMutuelle] = useState<Mutuelle | null>(null);
  const [concentrateur, setConcentrateur] = useState<Concentrateur | null>(
    null
  );

  const startIso = start ? new Date(start).toISOString() : null;
  const endIso = end ? new Date(end).toISOString() : null;

  const handleSubmit = () => {
    if (!startIso || !mutuelle || !concentrateur) return;
    return mutation.mutate({
      concentrateur,
      mutuelle,
      start: startIso,
      end: endIso,
    });
  };
  if (mutuellesQry.isLoading || concentrateurQry.isLoading)
    return <LogoLoader />;

  if (mutuellesQry.isError || concentrateurQry.isError)
    return (
      <ErrorHandler error={mutuellesQry.error || concentrateurQry.error} />
    );

  return (
    <Box display={"flex"} gap={2}>
      <Autocomplete
        disablePortal
        options={mutuellesQry.data ?? []}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} size="small" label="Mutuelle" />
        )}
        onChange={(_e, v) => setMutuelle(v)}
        getOptionLabel={(option) => option.name}
        getOptionKey={(option) => option.amc}
      />
      <Autocomplete
        disablePortal
        options={concentrateurQry.data ?? []}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} size="small" label="Concentrateur" />
        )}
        onChange={(_e, v) => setConcentrateur(v)}
        getOptionLabel={(option) => option.name}
        getOptionKey={(option) => option.amc}
      />

      <TextField
        type="date"
        size="small"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />

      <TextField
        type="date"
        size="small"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      />

      <Button onClick={handleSubmit}>Ajouter</Button>
    </Box>
  );
}
