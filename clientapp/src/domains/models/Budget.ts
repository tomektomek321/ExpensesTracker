import { period } from "../enums/Period";
import { IBudget } from "./IBudget";

export class Budget {
  public readonly id: string;
  public readonly period: period;
  public readonly amount: number;
  public readonly userId: string;

  constructor(data: IBudget) {
    this.id = data.id;
    this.period = data.period;
    this.amount = data.amount;
    this.userId = data.userId;
  }
}