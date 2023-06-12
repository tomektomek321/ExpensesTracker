import { period } from "../enums/Period";

export interface IBudget {
  id: string;
  period: period;
  amount: number;
  userId: string;
}