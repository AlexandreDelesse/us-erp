import {
  Box,
  Button,
  FormGroup,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useState, type ChangeEvent } from "react";
import { emptyLoan, type Loan } from "./Loan.model";

const loanFieldTypes: Record<keyof Loan, "string" | "number"> = {
  account: "string",
  bankName: "string",
  capital: "number",
  category: "string",
  company: "string",
  durationInMonth: "number",
  id: "number",
  label: "string",
  rate: "number",
  startDate: "string",
};

interface LoanFormProps {
  onSubmit: (loan: Loan) => void;
  isPending?: boolean;
}
export default function LoanForm(props: LoanFormProps) {
  const [open, setOpen] = useState(false);
  const [loan, setLoan] = useState(emptyLoan);

  const toggleOpen = () => setOpen(!open);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setLoan((old) => ({ ...old, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    const parsedLoan = Object.entries(loan).reduce((acc, [key, value]) => {
      const type = loanFieldTypes[key as keyof Loan];

      acc[key as keyof Loan] = type === "number" ? Number(value) : value;

      return acc;
    }, {} as Partial<Loan>);
    props.onSubmit(parsedLoan as Loan);
    toggleOpen();
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    padding: "16px",
  };

  return (
    <div>
      <Button onClick={toggleOpen} variant="contained" size="small">
        Ajouter un emprunt
      </Button>
      <Modal open={open} onClose={toggleOpen}>
        <Box sx={style}>
          <Typography textAlign={"center"}>Formulaire emprunt</Typography>
          <FormGroup sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
            {Object.keys(emptyLoan).map((k) => (
              <TextField
                size="small"
                onChange={handleChange}
                name={k}
                placeholder={k}
                label={k}
                type={
                  typeof emptyLoan[k as keyof Loan] == "string"
                    ? "string"
                    : "number"
                }
              />
            ))}
          </FormGroup>
          <Button disabled={props.isPending} onClick={handleSubmit}>
            Ajouter
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
