import { IExpense } from "./IExpense";

export class Expense {
  public readonly id: string;
  public readonly category: string;
  public readonly note: string;
  public readonly amount: number;
  public readonly date: Date;
  public readonly userId: string;

  constructor(data: IExpense) {
    this.id = data.id;
    this.category = data.category;
    this.note = data.note;
    this.amount = data.amount;
    this.date = new Date(data.date);
    this.userId = data.userId;
  }
}