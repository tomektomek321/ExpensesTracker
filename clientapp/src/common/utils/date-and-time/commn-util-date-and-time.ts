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

export function changeDay(dayShift: number): Date {

  const previousDate = new Date(new Date().getTime());
  previousDate.setDate(previousDate.getDate() + dayShift);
  
  return previousDate;
}