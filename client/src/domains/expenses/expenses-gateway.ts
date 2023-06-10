import { getMockExpensesBy } from "../../common/data/mocks";
import { Expense } from "../models/Expense";

export default function GetExpensesBy(userId: string, date: Date): Promise<Expense[]> {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(getMockExpensesBy("1", date));
    }, 300);
  });
}
