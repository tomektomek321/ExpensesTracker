import { Expense } from "../../domains/models/Expense";
import { NewExpense } from "../../domains/models/NewExpense";
import { isTheSameDate } from "../utils/date-and-time/commn-util-date-and-time";
import { mockExpenses } from "./mocks/mockExpenses";

export const emptyNewExpense: NewExpense = {
  category: "",
  name: "",
  price: 0,
}

export function getMockExpensesBy(userId: string, date: Date): Expense[] {
   debugger;
  let a = mockExpenses;
  a = mockExpenses.filter(e => {

    const itemDaty = e.date.getDate();
    const nowDat = date.getDate();

    const sameDate = isTheSameDate(e.date, date);

    return sameDate;
  });

  return a;
}
