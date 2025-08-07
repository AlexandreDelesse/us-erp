import type { Loan, LoanComputedDto, LoansInformations } from "./Loan.model";

export const isLoanEndAtDate = (loan: Loan, referenceDate: Date) => {
  return getElapsedMonth(loan, referenceDate) >= loan.durationInMonth;
};

export const getElapsedMonth = (loan: Loan, referenceDate: Date) =>
  (referenceDate.getFullYear() - new Date(loan.startDate).getFullYear()) * 12 +
  referenceDate.getMonth() -
  new Date(loan.startDate).getMonth();

export const getLoanCapitalRemaining = (loan: Loan, referenceDate: Date) => {
  const monthlyRate = loan.rate / 12;
  const elapsedMonths = getElapsedMonth(loan, referenceDate);

  const annuity =
    (loan.capital * monthlyRate) /
    (1 - Math.pow(1 + monthlyRate, -loan.durationInMonth));

  if (elapsedMonths <= 0) return loan.capital;
  if (elapsedMonths >= loan.durationInMonth) return 0;

  if (loan.rate == 0)
    return loan.capital * (1 - elapsedMonths / loan.durationInMonth);
  return (
    (annuity *
      (1 -
        Math.pow(1 + monthlyRate, -(loan.durationInMonth - elapsedMonths)))) /
    monthlyRate
  );
};

export const getAnnuity = (loan: Loan) =>
  (loan.capital * (loan.rate / 12)) /
  (1 - Math.pow(1 + loan.rate / 12, -loan.durationInMonth));

export const getLoanInformations = (
  loans: LoanComputedDto[]
): LoansInformations => {
  return {
    totalAnnuity: loans
      .filter((l) => l.isEnd)
      .map((loan) => loan.annuity)
      .reduce((total, annuity) => total + (annuity || 0), 0),

    totalNbLoans: loans.length,
    totalRemainingCapital: loans
      .map((loan) => loan.remainingCapital)
      .reduce((total, cap) => total + (cap || 0), 0),
  };
};

export const isLoanEnd = (loan: Loan, referenceDate: Date) => {
  const start = new Date(loan.startDate); // ex: '2021-05-16' ou objet Date
  const end = new Date(start);
  end.setMonth(end.getMonth() + loan.durationInMonth);

  return referenceDate >= end;
};

export const generateLoansGraphData = (loans: LoanComputedDto[]) => {
  const axis = generateMonthlyDates(new Date(), 10);
  const data = axis.map((d) =>
    getLoanInformations(
      loans.map((l) => ({
        ...l,
        annuity: getAnnuity(l.loan),
        remainingCapital: getLoanCapitalRemaining(l.loan, d),
        isEnd: false,
      }))
    )
  );

  return { axis, data };
};

function generateMonthlyDates(startDate: Date, count: number) {
  const dates = [];

  for (let i = 0; i < count + 1; i++) {
    const date = new Date(startDate);
    date.setFullYear(date.getFullYear() + i);

    // Corriger le jour si le mois n'a pas assez de jours (ex: 31 → 28 ou 30)
    if (date.getDate() !== new Date(startDate).getDate()) {
      date.setDate(0); // revient au dernier jour du mois précédent
    }

    dates.push(new Date(date));
  }

  return dates;
}
