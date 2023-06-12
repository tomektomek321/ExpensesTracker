import { atom } from "recoil";
import { period } from "../domains/enums/Period";

export interface BudgetState {
  amount: number | null;
  period: period | null;
}

const defaultBudgetState: BudgetState = {
  amount: null,
  period: null,
};

export const budgetState = atom<BudgetState>({
  key: "budgetState",
  default: defaultBudgetState,
});
