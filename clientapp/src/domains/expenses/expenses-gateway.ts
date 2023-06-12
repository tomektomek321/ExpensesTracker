import { mockExpenses } from "../../common/data/mocks/mockExpenses";
import { isTheSameDate } from "../../common/utils/date-and-time/commn-util-date-and-time";
import { Expense } from "../models/Expense";

const expensesDbName = 'expenses';

export function GetExpensesBy(userId: string, date: Date): Promise<Expense[] | number> {
  return new Promise(async (res, rej) => {
    try {
      let data = await localStorage.getItem(expensesDbName)!;

      const expenses = convertDbExpensesToDomain(data);

      let response = expenses.filter(e => {
        const sameDate = isTheSameDate(e.date, date);
        return sameDate;
      });
      res(response);

    } catch(e) {
      console.log(e);
      rej(-1);
    }
  });
}

function convertDbExpensesToDomain(data: string): Expense[] {
  const response: Expense[] = [];
  const expenses: any = JSON.parse(data);
  for(let i = 0; i < expenses.length; i++) {
    const ob = new Expense(expenses[i]);
    response.push(ob);
  }

  return response;

}

export function SaveExpense(expense: Expense): Promise<number> {
  return new Promise(async (res, rej) => {
    try {
      let data = await localStorage.getItem(expensesDbName)!;

      const expenses = convertDbExpensesToDomain(data);
    
      expenses.push(expense);
    
      await localStorage.setItem(expensesDbName, JSON.stringify(expenses));
    
      res(1);

    } catch(e) {
      console.log(e);
      rej(-1);
    }
  });
}

export function UpdateExpense(expense: Expense): Promise<number> {
  return new Promise(async (res, rej) => {
    try {
      let data = await localStorage.getItem(expensesDbName)!;

      const expenses = convertDbExpensesToDomain(data);

      const foundedExpense = expenses.findIndex(e => e.id === expense.id)!;

      const newExpense = new Expense({ 
        id: expenses[foundedExpense].id,
        category: expense.category,
        note: expense.note,
        amount: expense.amount,
        date: expenses[foundedExpense].date.toString(),
        userId: expenses[foundedExpense].userId,
      });
  
      expenses.splice(foundedExpense, 1, newExpense);

      await localStorage.setItem(expensesDbName, JSON.stringify(expenses));
      console.log(1);
      res(1);

    } catch(e) {
      console.log(e);
      rej(-1);
    }
  });
}

export function RemoveExpense(expenseId: string): Promise<number> {
  return new Promise(async (res, rej) => {
    try {
      let data = await localStorage.getItem(expensesDbName)!;

      const expenses = convertDbExpensesToDomain(data);

      const foundedExpense = expenses.findIndex(e => e.id === expenseId)!;

      expenses.splice(foundedExpense, 1);

      await localStorage.setItem(expensesDbName, JSON.stringify(expenses));
      console.log(1);
      res(1);

    } catch(e) {
      console.log(e);
      rej(-1);
    }
  });
}

export function TestSave(): Promise<number> {
  return new Promise(async (res, rej) => {
    try {
      let data: Expense[] = mockExpenses;
    
      await localStorage.setItem(expensesDbName, JSON.stringify(data));
      console.log(1);
      res(1);

    } catch(e) {
      console.log(e);
      rej(-1);
    }
  });
}
