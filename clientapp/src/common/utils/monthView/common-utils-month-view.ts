import { DayExpenses } from "../../../domains/expenses/expenses-gateway";

export function addEmptyDays(month: DayExpenses[], date: Date) {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

  let lastDay: Date = getLastDateOfMonth(date);

  const dayOfWeekFirst = firstDay.getDay();
  const dayOfWeekLast = lastDay.getDay();

  let resp: DayExpenses[] = [...month];
  if(dayOfWeekFirst === 0) {
    const a = addPreviousDays(6, date);
    resp = [...a, ...resp];
  } else if(dayOfWeekFirst > 1) {
    const b = addPreviousDays(7 - dayOfWeekFirst, date);
    resp = [...b, ...resp];
  }

  if(dayOfWeekLast === 0) {
    
  } else if(dayOfWeekLast >= 1) {
    const b = addNextDays(7 - dayOfWeekLast, date);
    resp = [...resp, ...b];
  }

  return resp;

}

function addPreviousDays(days: number, date: Date): DayExpenses[] {
  const resp: DayExpenses[] = [];
  let val: number = 0;
  for(let i = 0; i < days; i++) {
    
    const day = new Date(date.getFullYear(), date.getMonth(), val);
    const nextDay: DayExpenses = {
      day: new Date(date.getFullYear(), date.getMonth() - 1, day.getDate()),
      expenses: [],
    }
    resp.push(nextDay);
    val -= 1;
  }

  resp.reverse();

  return resp;
}

function addNextDays(days: number, date: Date): DayExpenses[] {
  const resp: DayExpenses[] = [];
  let val: number = 1;
  for(let i = 0; i < days; i++) {
    
    const day = new Date(date.getFullYear(), date.getMonth() + 1, val);
    const nextDay: DayExpenses = {
      day: new Date(date.getFullYear(), date.getMonth() + 1, day.getDate()),
      expenses: [],
    }
    resp.push(nextDay);
    val += 1;
  }

  return resp;
}

function getLastDateOfMonth(date: Date): Date {
  const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  
  const lastDayOfMonth = new Date(nextMonth.getTime() - 1);
  
  return lastDayOfMonth;
}