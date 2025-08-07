import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import LoanTable from "./LoanTable";

import { useState } from "react";
import useLoanService from "./useLoanService.service";
import LoansInformationsView from "./LoansInformationsView";
import LoanLineChart from "./LoanLineChart";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import ClearIcon from "@mui/icons-material/Clear";
import LoanForm from "./LoanForm";

export default function LoanContainer() {
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [referenceDate, setReferenceDate] = useState<Dayjs | null>(dayjs());

  const {
    loans,
    loansInformations,
    loanCategories,
    loanCompanies,
    chartData,
    createMutation,
  } = useLoanService({
    category,
    referenceDate: referenceDate?.toDate(),
    company,
  });

  const clearFilters = () => {
    setCategory("");
    setCompany("");
  };

  //TODO: Remanier l'axe X pour qu'il corresponde à la donnée. Implémenter le dataset et une route pour récupérer les données du graph.
  return (
    <Box>
      <Box display={"flex"} gap={2} alignItems={"center"}>
        {/* <TextField
          type="date"
          size="small"
          value={referenceDate.toISOString().split("T")[0]}
          onChange={(e) => setReferenceDate(new Date(e.target.value))}
        /> */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Controlled picker"
            slotProps={{ textField: { size: "small" } }}
            value={referenceDate}
            onChange={(newValue) => setReferenceDate(dayjs(newValue))}
          />
        </LocalizationProvider>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel sx={{ alignSelf: "center" }} id="category-label">
            Categorie
          </InputLabel>

          <Select
            size="small"
            labelId="category-label"
            value={category}
            label="Categorie"
            variant="standard"
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value={""}>Tous</MenuItem>
            {loanCategories.map((c) => (
              <MenuItem value={c}>{c}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel sx={{ alignSelf: "center" }} id="company-label">
            Sociétés
          </InputLabel>
          <Select
            labelId="company-label"
            variant="standard"
            size="small"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          >
            <MenuItem value={""}>Tous</MenuItem>
            {loanCompanies.map((c) => (
              <MenuItem value={c}>{c}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <IconButton onClick={clearFilters}>
          <ClearIcon />
        </IconButton>

        <LoanForm
          onSubmit={createMutation.mutate}
          isPending={createMutation.isPending}
        />
      </Box>
      <LoansInformationsView infos={loansInformations} />
      <LoanLineChart chartData={chartData} loans={loans} />
      <LoanTable loansComputed={loans} />
    </Box>
  );
}
