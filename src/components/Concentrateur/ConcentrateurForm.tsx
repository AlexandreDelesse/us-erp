import { useRef, useState, type ChangeEvent } from "react";

import { Box, Button, TextField } from "@mui/material";

import { useMutation } from "@tanstack/react-query";
import { postConcentrateur } from "./Concentrateur.service";
import { queryClient } from "../../queryClient";
import type { Concentrateur } from "./Consentrateur.model";


export default function ConcentrateurForm() {
  const mutation = useMutation({
    mutationKey: ["concentrateurs"],
    mutationFn: (m: Concentrateur) => postConcentrateur(m),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["concentrateurs"] });
      setFormValue(defaulValue);
      inputRef.current?.focus();
    },
  });

  const inputRef = useRef<HTMLInputElement | null>(null);
  const defaulValue: Concentrateur = { amc: "", name: "" };

  const [formValue, setFormValue] = useState(defaulValue);

  const updateForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((old) => ({ ...old, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formValue.amc || !formValue.name) return;
    mutation.mutate(formValue);
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key == "Enter") handleSubmit();
  };

  return (
    <Box display={"flex"} gap={2}>
      {Object.keys(formValue).map((key, index) => (
        <TextField
          inputRef={index == 0 ? inputRef : null}
          name={key}
          size="small"
          key={key}
          value={formValue[key as keyof Concentrateur]}
          onChange={updateForm}
          onKeyUp={handleKeyUp}
          label={key}
        />
      ))}
      <Button onClick={handleSubmit}>Ajouter</Button>
    </Box>
  );
}
