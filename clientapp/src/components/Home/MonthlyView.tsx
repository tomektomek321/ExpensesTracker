import { Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';
import { appState } from '../../atoms/AppAtom';
import { DayExpenses } from '../../domains/expenses/expenses-gateway';
import DayOfMonth from './DayOfMonth';
import { ExpensesGateway } from '../../domains/expenses/expenses-gateway';

export default function MonthlyView() {

  const appRecoil = useRecoilValue(appState);
  const [monthExpenses, setMonthExpenses] = useState<DayExpenses[]>([]);

  useEffect(() => {
    // ExpensesGateway.getMonthlyExpenses(appRecoil.date)
    // .then((month: DayExpenses[] | number) => {
    //   if(typeof month !== 'number') {
    //     setMonthExpenses(month);
    //   }
    // });

    ExpensesGateway.getMonthlyExpenses(appRecoil.date)
    .then((month: DayExpenses[] | number) => {
      console.log(month);
      if(typeof month !== 'number') {
        setMonthExpenses(month);
      }
    });
  }, [appRecoil]);

  return (
    <Flex
      flexDirection={'row'}
      flexWrap={'wrap'}
      rounded="lg"
      width={'100%'}
      maxWidth={1000}
      m="10px auto"
      justifyContent={'flex-start'}
    >
      {
        monthExpenses.map((day: DayExpenses, idx: number) => {
          return <DayOfMonth key={idx} day={day.day} expenses={day.expenses}  />
        })
      }
      
    </Flex>
  )
}
