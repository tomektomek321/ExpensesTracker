export interface Expense {
  id: string;
  category: string;
  name: string;
  price: number;
  date: Date;
  userId: string;
}