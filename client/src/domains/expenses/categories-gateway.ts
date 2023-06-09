import { Expense } from "../models/Expense";

export default function GetExpensesBy(userId: string, day: number): Promise<Expense[]> {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res([
        {id: "123asd", name: "ziemniaki", category: "Spożywka", price: 10, userId: "addd1", },
        {id: "1234sd", name: "Kino", category: "Rozrywka", price: 25, userId: "addd1", },
        {id: "123a1d", name: "Buty", category: "Sport", price: 150, userId: "addd1", },
      ]);
    }, 300);
  });
}
