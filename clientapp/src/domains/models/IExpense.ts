export interface IExpense {
  id: string | null;
  categoryId: string;
  note: string;
  amount: number;
  date: string;
  userId: string;
}

export interface IExpensesResponse {
  id: string;
  categoryId: string;
  note: string;
  amount: number;
  date: string;
  userId: string;
}