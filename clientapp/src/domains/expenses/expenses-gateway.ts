import { testUserId } from "../../common/data/mocks";
import { mockExpenses } from "../../common/data/mocks/mockExpenses";
import { isTheSameDate } from "../../common/utils/date-and-time/commn-util-date-and-time";
import { makeRandomID } from "../../common/utils/randomID";
import { period } from "../enums/Period";
import { Budget } from "../models/Budget";
import { Expense } from "../models/Expense";

const expensesDbName = 'expenses';
const budgetDbName = 'budget';

export function GetExpensesBy(userId: string, date: Date): Promise<[Expense[], Budget] | number> {
  return new Promise(async (res, rej) => {
    try {
      // addTestBudget();
      const budget: Budget = await GetBudget()!;
      let data =  localStorage.getItem(expensesDbName)!;

      const expenses = convertDbExpensesToDomain(data);

      let response = expenses.filter(e => {
        const sameDate = isTheSameDate(e.date, date);
        return sameDate;
      });
      res([response, budget]);

    } catch(e) {
      console.log("GetExpensesBy error");
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
      console.log("SaveExpense error");
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
      console.log("UpdateExpense error");
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
      console.log("RemoveExpense error");
      rej(-1);
    }
  });
}

export function addTestExpenses(): Promise<number> {
  return new Promise(async (res, rej) => {
    try {
      let data: Expense[] = mockExpenses;
    
      await localStorage.setItem(expensesDbName, JSON.stringify(data));
      console.log(1);
      res(1);

    } catch(e) {
      console.log("addTestExpenses error");
      rej(-1);
    }
  });
}

export function addTestBudget() {
  const budget = new Budget({
    id: makeRandomID(),
    amount: 3500,
    period: period.Monthly,
    userId: testUserId,
  });

  localStorage.setItem(budgetDbName, JSON.stringify(budget));
}


export function GetBudget(): Promise<Budget> {
  return new Promise(async (res, rej) => {
    try {    
      let budgetDbString = await localStorage.getItem(budgetDbName);
      if(!budgetDbString) {

        return new Budget({
          id: makeRandomID(),
          amount: 0,
          period: period.Monthly,
          userId: testUserId,
        })
      }
      let budget = JSON.parse(budgetDbString);
      let a = new Budget({
        id: budget.id,
        amount: budget.amount,
        period: budget.period,
        userId: budget.userId,
      })
      console.log(1);
      res(a);

    } catch(e) {
      console.log("GetBudget error");
      rej(-1);
    }
  });
}
