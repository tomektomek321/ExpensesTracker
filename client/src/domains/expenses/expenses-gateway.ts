import { getMockExpensesBy } from "../../common/data/mocks";
import { Expense } from "../models/Expense";

export default function GetExpensesBy(userId: string, day: number): Promise<Expense[]> {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(getMockExpensesBy("1", -1));
    }, 300);
  });
}
