import { getLoanInformations } from "./LoanTools.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getComputedLoans, postLoan } from "./Loan.api";
import type {
  Loan,
  LoanChartPoint,
  LoanComputedDto,
  LoanDashboard,
} from "./Loan.model";
import type { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { queryClient } from "../../queryClient";

interface LoanServiceProps {
  referenceDate?: Date;
  category?: string;
  company?: string;
}
export default function useLoanService(props: LoanServiceProps) {
  const query = useQuery<LoanDashboard, AxiosError>({
    queryKey: ["loans", props.referenceDate, props.company, props.category],
    queryFn: () =>
      getComputedLoans(
        props.referenceDate?.toISOString(),
        props.company,
        props.category
      ),
  });

  const createMutation = useMutation({
    mutationKey: ["loan"],
    mutationFn: (cmd: Loan) => postLoan(cmd),
    onSuccess: () => {
      enqueueSnackbar("Emprunt ajouté", { variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["loan"] });
    },
    onError: (err) =>
      enqueueSnackbar(err.message ?? "Une erreur est survenue", {
        variant: "error",
      }),
  });

  const loansComputed: LoanComputedDto[] = query.data?.loanComputed ?? [];
  const loanChartData: LoanChartPoint[] = query.data?.chartPoints ?? [];

  const extendedLoans = loansComputed.filter(
    (l) =>
      (!props.category || l.loan.category == props.category) &&
      (!props.company || l.loan.company == props.company)
  );

  const loansInformations = getLoanInformations(extendedLoans);

  const loanCategories = [
    ...new Set(
      loansComputed
        .map((loanComputed) => loanComputed.loan.category)
        .filter(Boolean)
    ),
  ];

  const loanCompanies = [
    ...new Set(
      loansComputed
        .map((loanComputed) => loanComputed.loan.company)
        .filter(Boolean)
    ),
  ];

  return {
    chartData: loanChartData,
    loans: extendedLoans,
    loansInformations,
    loanCategories,
    loanCompanies,
    createMutation,
  };
}
