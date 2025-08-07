import { notificationClient } from "../../api/client";
import type { Loan } from "./Loan.model";

export const getLoans = async () => (await notificationClient.get("Loan")).data;

export const getComputedLoans = async (
  date?: string,
  company?: string,
  category?: string
) =>
  (
    await notificationClient.get("Loan/stats", {
      params: { ReferenceDate: date, company, category },
    })
  ).data;

export const postLoan = async (loan: Loan) =>
  (await notificationClient.post("loan", loan)).data;
