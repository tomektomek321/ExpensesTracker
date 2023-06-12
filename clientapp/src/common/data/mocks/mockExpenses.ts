import { Expense } from "../../../domains/models/Expense";

export const mockExpenses: Expense[] = [
  { id: "123asd", note: "ziemniaki", category: "Spożywka", amount: 10, date: new Date(2023, 5, 10, 12, 25, 10), userId: "addd1", },
  { id: "1234sd5", note: "Kino", category: "Rozrywka", amount: 25, date: new Date(2023, 5, 10, 14, 25, 10), userId: "addd1", },
  { id: "123a1djh", note: "Buty", category: "Sport", amount: 150, date: new Date(2023, 5, 10, 16, 25, 10), userId: "addd1", },

  { id: "123asdd", note: "kurczak", category: "Spożywka", amount: 20, date: new Date(2023, 5, 9, 16, 25, 10), userId: "addd1", },
  { id: "123asdhd", note: "ogórki", category: "Spożywka", amount: 10, date: new Date(2023, 5, 9, 16, 25, 10), userId: "addd1", },
  { id: "1234s23d5", note: "Mecz w pubie", category: "Rozrywka", amount: 20, date: new Date(2023, 5, 9, 16, 25, 10), userId: "addd1", },
  { id: "123a1d55jh", note: "Pilka nożna", category: "Sport", amount: 10, date: new Date(2023, 5, 9, 16, 25, 10), userId: "addd1", },
  
  { id: "123a1d55jh32", note: "bulki", category: "Sport", amount: 5, date: new Date(), userId: "addd1", },
  { id: "123a1d55jh56", note: "Pilka nożna", category: "Sport", amount: 20, date: new Date(), userId: "addd1", },
  { id: "123a1d55jh78", note: "kino", category: "Rozrywka", amount: 20, date: new Date(), userId: "addd1", },
];