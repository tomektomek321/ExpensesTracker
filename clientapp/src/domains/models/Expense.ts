import { IExpense } from "./IExpense";

export class Expense {
  public readonly id: string | null;
  public readonly categoryId: string;
  public readonly note: string;
  public readonly amount: number;
  public readonly date: Date;
  public readonly userId: string;

  constructor(data: IExpense) {
    this.id = data.id;
    this.categoryId = data.categoryId;
    this.note = data.note;
    this.amount = data.amount;
    this.date = new Date(data.date);
    this.userId = data.userId;
  }
}