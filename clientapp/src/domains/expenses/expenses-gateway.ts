import { convertToUrlDateTime, getNumberOfDaysForMonth, isTheSameDate } from "../../common/utils/date-and-time/commn-util-date-and-time";
import { environment } from "../../environment/environment";
import { AuthGateway } from "../auth/auth-gateway";
import { Expense } from "../models/Expense";
import { IExpense, IExpensesResponse } from "../models/IExpense";
import { IExpensePayload } from "../models/IExpensePayload";

export interface DayExpenses {
  day: Date;
  expenses: Expense[];
}

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
      .then((d: Response) => {
        if(d.status === 401) {
          rej(401);
          return;
        } else {
          return d.json();
        }
      })
      .then((resp: IExpensesResponse[]) => {
        if(resp !== undefined) {
          const response: Expense[] = this.convertDtoToExpenses(resp);
          res(response);
        }
      }).catch(e => { 
        console.log(e);
        rej(e);
      });
    });
  }

  public static convertDtoToExpenses(dto: IExpensesResponse[]): Expense[] {
    const response: Expense[] = dto.map(e => new Expense({
      id: e.id,
      categoryId: e.categoryId,
      note: e.note,
      amount: e.amount,
      date: e.date,
      userId: e.userId,
    }));
    return response;
  }

  public static convertExpensesToMonthlyView(expenses: Expense[], date: Date): DayExpenses[] {
    const numberOfDays = getNumberOfDaysForMonth(date);

    const dayExpenses: DayExpenses[] = [];

    for(let i = 1; i < numberOfDays; i++) {

      const date1 = new Date();
        date1.setDate(i);
        date1.setMonth(date.getMonth());
      
      const day = expenses.filter(e => {
        const sameDate = isTheSameDate(date1, e.date);
        return sameDate;
      });

      const d: DayExpenses = {
        day: date1,
        expenses: day,
      }

      dayExpenses.push(d);
    }

    return dayExpenses;
  }

  public static async getMonthlyExpenses(date: Date): Promise<DayExpenses[]> {
    const token: any = await AuthGateway.getPersistedUser();

    return new Promise((res, rej) => {
      fetch(this.apiUrl + `transactions?month=${date.getMonth() + 1}&year=${date.getFullYear()}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.token}`
        }
      })
      .then(d => d.json())
      .then((resp: IExpensesResponse[]) => {
        return resp;
      })
      .then((d: IExpensesResponse[]) => {
        const expenses: Expense[] = this.convertDtoToExpenses(d);
        const dayExpenses: DayExpenses[] = this.convertExpensesToMonthlyView(expenses, date);
        res(dayExpenses);

      })
      .catch(e => { 
        console.log(e);
        rej(e);
      });
    });
  }

  public static convertDbExpensesToDomain(data: string): Expense[] {
    const response: Expense[] = [];
    const expenses: any = JSON.parse(data);
    for(let i = 0; i < expenses.length; i++) {
      const ob = new Expense(expenses[i]);
      response.push(ob);
    }

    return response;
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
      .then((resp: IExpense) => {
        res(new Expense(resp));
      }).catch(e => { 
        console.log(e);
        rej(e);
      });
    });
  }
}