import { Expense } from "../../domains/models/Expense";
import { NewExpense } from "../../domains/models/NewExpense";
import { isTheSameDate } from "../utils/date-and-time/commn-util-date-and-time";
import { mockExpenses } from "./mocks/mockExpenses";

export const emptyNewExpense: NewExpense = {
  category: "",
  note: "",
  amount: 0,
}

export function getMockExpensesBy(userId: string, date: Date): Expense[] {
  let a = mockExpenses;
  a = mockExpenses.filter(e => {
    const sameDate = isTheSameDate(e.date, date);
    return sameDate;
  });

  return a;
}

export const testUserId = "addd1";