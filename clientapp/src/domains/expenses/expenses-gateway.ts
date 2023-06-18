import { convertToUrlDateTime } from "../../common/utils/date-and-time/commn-util-date-and-time";
import { environment } from "../../environment/environment";
import { AuthGateway } from "../auth/auth-gateway";
import { Expense } from "../models/Expense";
import { IExpensePayload } from "../models/IExpensePayload";

export class ExpensesGateway {

  private static readonly apiUrl = environment.apiUrl;

  public static async addExpense(expense: IExpensePayload): Promise<boolean> {
    const token: any = await AuthGateway.getPersistedUser();

    return new Promise((res, rej) => {
      fetch(this.apiUrl + "transactions", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.token}`
        },
        body: JSON.stringify(expense),
      }).then(resp => {
        !!resp && res(true);
      }).catch(e => { 
        console.log(e);
        rej(e);
      });
    });
  }

  public static async deleteExpense(expenseId: string): Promise<boolean> {
    const token: any = await AuthGateway.getPersistedUser();

    return new Promise((res, rej) => {
      fetch(this.apiUrl + `transactions/${expenseId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.token}`
        },
      }).then(resp => {
        !!resp && res(true);
      }).catch(e => { 
        console.log(e);
        rej(e);
      });
    });
  }

  public static async getExpenses(date: Date): Promise<Expense[]> {
    const token: any = await AuthGateway.getPersistedUser();

    return new Promise((res, rej) => {
      fetch(this.apiUrl + `transactions?date=${convertToUrlDateTime(date)}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.token}`
        }
      })
      .then(d => d.json())
      .then((resp: Expense[]) => {
        console.log(resp);
        res(resp);
      }).catch(e => { 
        console.log(e);
        rej(e);
      });
    });
  }

  public static async saveExpense(expense: Expense): Promise<Expense> {
    const token: any = await AuthGateway.getPersistedUser();

    return new Promise((res, rej) => {
      fetch(this.apiUrl + `transactions`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.token}`
        },
        body: JSON.stringify(expense),
      })
      .then(d => d.json())
      .then((resp: Expense) => {
        res(resp);
      }).catch(e => { 
        console.log(e);
        rej(e);
      });
    });
  }
}