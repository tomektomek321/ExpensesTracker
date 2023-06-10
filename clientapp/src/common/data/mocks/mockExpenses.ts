import { Expense } from "../../../domains/models/Expense";

export const mockExpenses: Expense[] = [
  { id: "123asd", name: "ziemniaki", category: "Spożywka", price: 10, date: new Date(2023, 5, 10, 12, 25, 10), userId: "addd1", },
  { id: "1234sd5", name: "Kino", category: "Rozrywka", price: 25, date: new Date(2023, 5, 10, 14, 25, 10), userId: "addd1", },
  { id: "123a1djh", name: "Buty", category: "Sport", price: 150, date: new Date(2023, 5, 10, 16, 25, 10), userId: "addd1", },

  { id: "123asdd", name: "kurczak", category: "Spożywka", price: 20, date: new Date(2023, 5, 9, 16, 25, 10), userId: "addd1", },
  { id: "123asdhd", name: "ogórki", category: "Spożywka", price: 10, date: new Date(2023, 5, 9, 16, 25, 10), userId: "addd1", },
  { id: "1234s23d5", name: "Mecz w pubie", category: "Rozrywka", price: 20, date: new Date(2023, 5, 9, 16, 25, 10), userId: "addd1", },
  { id: "123a1d55jh", name: "Pilka nożna", category: "Sport", price: 10, date: new Date(2023, 5, 9, 16, 25, 10), userId: "addd1", },
];