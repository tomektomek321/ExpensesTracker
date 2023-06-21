import React, { useEffect } from 'react';
import { Expense } from '../../domains/models/Expense';
import { Box, Flex } from '@chakra-ui/react';
import { countDayBudget, countDayBudgetPercentage, setColorForPercentage } from '../../common/utils/budget/common-util-budget';
import { useRecoilState, useRecoilValue } from 'recoil';
import { budgetState } from '../../atoms/BudgetAtom';
import { convertToUrlDateTime, getNumberOfDaysForMonth } from '../../common/utils/date-and-time/commn-util-date-and-time';
import { appState } from '../../atoms/AppAtom';
import { ViewType } from '../../domains/enums/ViewType';

type ExpenseRowProps = {
  day: Date;
  expenses: Expense[];
};

const DayOfMonth: React.FC<ExpenseRowProps> = ({
  day,
  expenses,
}) => {
  const budgetRecoil = useRecoilValue(budgetState);
  const [appRecoil, setAppState] = useRecoilState(appState);

  const sumDayBudget = (): number => {
    const value = expenses.reduce((prev: number, curr: Expense) => {
      return prev + curr.amount;
    }, 0);
    return value;
  }

  useEffect(() => {
    
  }, []);

  const setColor = (): string => {
    const numberOfDays = getNumberOfDaysForMonth(appRecoil.date);
    const dayBudget = countDayBudget(numberOfDays, budgetRecoil.amount!);
    const daySum = sumDayBudget();
    const dayPercentage = countDayBudgetPercentage(dayBudget, daySum);

    return setColorForPercentage(dayPercentage);
  }

  const showDay = () => {
    let setDay = appRecoil.date.setDate(day.getDate());
    let newDate = new Date(setDay);

    setAppState(prev => {
      return {
        ...prev,
        viewType: ViewType.Day,
        date: newDate,
      }
    })
  }

  const isTheSameMonth = () => {
    return appRecoil.date.getMonth() === day.getMonth()
  }

  return (
    <Flex
      flexDirection={'column'}
      borderWidth="1px"
      rounded="lg"
      shadow="1px 1px 3px rgba(0,0,0,0.3)"
      p={6}
      width={'130px'}
      minHeight={'140px'}
      m="6px"
      justifyContent={'space-between'}
      bgColor={setColor()}
      opacity={isTheSameMonth() ? 1 : 0.3}
      onClick={() => showDay()}
    >
      <Box>{convertToUrlDateTime(day)}</Box>
      <Flex flexDirection={'column'}>
        { sumDayBudget() } zł
      </Flex>
    </Flex>
  )
}
export default DayOfMonth;