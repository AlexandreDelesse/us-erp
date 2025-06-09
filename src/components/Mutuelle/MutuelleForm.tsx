import { useRef, useState, type ChangeEvent } from "react";
import type { Mutuelle } from "./Mutuelle.model";
import { Box, Button, TextField } from "@mui/material";

import { useMutation } from "@tanstack/react-query";
import { postMutuelle } from "./Mutuelle.service";
import { queryClient } from "../../queryClient";

export default function MutuelleForm() {
  const mutation = useMutation({
    mutationKey: ["mutuelles"],
    mutationFn: (m: Mutuelle) => postMutuelle(m),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mutuelles"] });
      setFormValue(defaulValue);
      inputRef.current?.focus();
    },
  });

  const inputRef = useRef<HTMLInputElement | null>(null);
  const defaulValue: Mutuelle = { amcNb: "", name: "" };

  const [formValue, setFormValue] = useState(defaulValue);

  const updateForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((old) => ({ ...old, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formValue.amcNb || !formValue.name) return;
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
          value={formValue[key as keyof Mutuelle]}
          onChange={updateForm}
          onKeyUp={handleKeyUp}
          label={key}
        />
      ))}
      <Button onClick={handleSubmit}>Ajouter</Button>
    </Box>
  );
}
