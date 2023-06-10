import { Expense } from "../../domains/models/Expense";
import { NewExpense } from "../../domains/models/NewExpense";
import { mockExpenses } from "./mocks/mockExpenses";

export const emptyNewExpense: NewExpense = {
  category: "",
  name: "",
  price: 0,
}

export function getMockExpensesBy(userId: string, day: number): Expense[] {
  // debugger;
  let a = mockExpenses;
  a = mockExpenses.filter(e => {
    const itemDaty = e.date.getDate();
    const nowDat = (new Date().getDate() + day);
    return itemDaty === nowDat;
  });

  return a;
}