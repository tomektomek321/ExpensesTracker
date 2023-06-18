import { Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';
import { appState } from '../../atoms/AppAtom';
import { DayExpenses, GetMonthExpensesBy } from '../../domains/expenses/expenses2-gateway';
import { testUserId } from '../../common/data/mocks';
import DayOfMonth from './DayOfMonth';

export default function MonthlyView() {

  const appRecoil = useRecoilValue(appState);
  const [monthExpenses, setMonthExpenses] = useState<DayExpenses[]>([]);

  useEffect(() => {
    GetMonthExpensesBy(testUserId, appRecoil.date).then((month: DayExpenses[] | number) => {
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
