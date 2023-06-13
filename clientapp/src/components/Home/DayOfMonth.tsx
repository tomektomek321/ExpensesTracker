import React from 'react';
import { Expense } from '../../domains/models/Expense';
import { Box, Flex } from '@chakra-ui/react';
import { countDayBudget, countDayBudgetPercentage, setColorForPercentage } from '../../common/utils/budget/common-util-budget';
import { useRecoilState } from 'recoil';
import { budgetState } from '../../atoms/BudgetAtom';
import { getNumberOfDaysForMonth } from '../../common/utils/date-and-time/commn-util-date-and-time';
import { appState } from '../../atoms/AppAtom';
import { ViewType } from '../../domains/enums/ViewType';

type ExpenseRowProps = {
  day: number;
  expenses: Expense[];
};

const DayOfMonth: React.FC<ExpenseRowProps> = ({
  day,
  expenses,
}) => {
  const [budgetRecoil, setBudgetState] = useRecoilState(budgetState);
  const [appRecoil, setAppState] = useRecoilState(appState);

  const sumDayBudget = (): number => {
    const x = expenses.reduce((prev: number, curr: Expense) => {
      return prev + curr.amount;
    }, 0);
    return x;
  }

  const setColor = (): string => {
    const numberOfDays = getNumberOfDaysForMonth(appRecoil.date);
    console.log(numberOfDays);
    
    
    const b = countDayBudget(numberOfDays, budgetRecoil.amount!);
    const c = sumDayBudget();
    const x = countDayBudgetPercentage(b, c);
    console.log(x);
    return setColorForPercentage(x);
  }

  const showDay = () => {
    let setDay = appRecoil.date.setDate(day);
    let a  = new Date(setDay);
    debugger;
    setAppState(prev => {
      return {
        ...prev,
        viewType: ViewType.Day,
        date: a,
      }
    })
  }


  return (
    <Flex
      flexDirection={'column'}
      borderWidth="1px"
      rounded="lg"
      shadow="1px 1px 3px rgba(0,0,0,0.3)"
      p={6}
      width={'130px'}
      minHeight={'170px'}
      m="6px"
      justifyContent={'space-between'}
      bgColor={setColor()}
      onClick={() => showDay()}
    >
      <Box>Day {day}</Box>
      <Flex flexDirection={'column'}>
        { sumDayBudget() } zł
        {/* {
          expenses.map((expense: Expense, idx: number) => {
            return(
              <Flex key={idx}>
                {expense.amount}
              </Flex>
            )
          })
        } */}
      </Flex>
    </Flex>
  )
}
export default DayOfMonth;