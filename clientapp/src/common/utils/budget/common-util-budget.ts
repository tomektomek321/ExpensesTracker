export function countDayBudgetPercentage(percentageDayBudget: number, daySpend: number) {
  if(!daySpend) {
    return 0;
  }
  const val = (daySpend / percentageDayBudget) * 100;
  console.log(daySpend);
  console.log(percentageDayBudget);
  console.log(val);
  return val;
}

export function countDayBudget(numberOfDaysForMonth: number, budget: number): number {
  const b = parseInt((budget / numberOfDaysForMonth).toFixed(2));
  return b;
}

export function setColorForPercentage(percentage: number): string {
  
  if(percentage < 30) return 'green.300';
  if(percentage < 70) return 'green.100';
  if(percentage < 80) return 'red.100';
  if(percentage < 90) return 'red.200';
  
  if(percentage > 270) return 'red.800';
  if(percentage < 230) return 'red.600';
  if(percentage < 150) return 'red.500';
  if(percentage < 130) return 'red.400';
  return 'red.300';
}