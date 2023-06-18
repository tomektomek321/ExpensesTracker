export function isTheSameDate(date1: Date, date2: Date): boolean {
  if (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth()
  ) {
    return true;
  }

  return false;
}

export function isTheSameMonth(date1: Date, date2: Date): boolean {
  if (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  ) {
    return true;
  }

  return false;
}

export function changeDay(date: Date, dayShift: number): Date {
  const previousDate = new Date(date.getTime());
  previousDate.setDate(previousDate.getDate() + dayShift);
  
  return previousDate;
}

export function setDay(date: Date, day: number): Date {
  const previousDate = new Date(date.getTime());
  previousDate.setDate(day);
  
  return previousDate;
}

export function getNumberOfDaysForMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
}

export function convertToUrlDateTime(date: Date): string {
  const dd = date.getDate();
  const yy = date.getFullYear();
  const mm = date.getMonth() + 1;

  return `${yy}-${mm}-${dd}`;
}