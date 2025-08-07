export interface Loan {
  id: number;
  label: string;
  category: string;
  account: string;
  company: string;
  bankName: string;
  capital: number;
  rate: number;
  durationInMonth: number;
  startDate: string;
}

export const emptyLoan: Loan = {
  id: 0,
  label: "",
  category: "",
  account: "",
  company: "",
  bankName: "",
  capital: 0,
  rate: 0,
  durationInMonth: 0,
  startDate: "",
};

export interface LoanExtended extends Loan {
  remainingCapital: number;
  annuity: number;
  isEnd: boolean;
}

export interface LoansInformations {
  totalAnnuity: number;
  totalRemainingCapital: number;
  totalNbLoans: number;
}

export interface LoanComputedDto {
  loan: Loan;
  remainingCapital: number;
  annuity: number;
  isEnd: boolean;
}

export interface LoanDashboard {
  loanComputed: LoanComputedDto[];
  chartPoints: LoanChartPoint[];
}

export interface LoanChartDto {
  chartName: string;
  points: LoanChartPoint[];
}

export interface LoanChartPoint {
  x: string;
  y: number;
}
