import React, { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react'
import { useRecoilValue } from 'recoil';
import { appState } from '../../atoms/AppAtom';
import { DayExpenses } from '../../domains/expenses/expenses-gateway';
import DayOfMonth from './DayOfMonth';
import { ExpensesGateway } from '../../domains/expenses/expenses-gateway';
import { addEmptyDays } from '../../common/utils/monthView/common-utils-month-view';

export default function MonthlyView() {

  const appRecoil = useRecoilValue(appState);
  const [monthExpenses, setMonthExpenses] = useState<DayExpenses[]>([]);

  useEffect(() => {
    ExpensesGateway.getMonthlyExpenses(appRecoil.date)
    .then((month: DayExpenses[] | number) => {
      console.log(month);
      if(typeof month !== 'number') {
        const resp = addEmptyDays(month, appRecoil.date);
        setMonthExpenses(resp);
      }
    })
    .catch(e => {
      console.log('MonthlyView ExpensesGateway.getMonthlyExpenses error');
      console.log(e);
    })
  }, [appRecoil]);

  return (
    <>
      <Flex
        flexDirection={'row'}
        flexWrap={'wrap'}
        rounded="lg"
        width={'100%'}
        maxWidth={1000}
        m="10px auto 0px auto"
        justifyContent={'flex-start'}
      >
        {
          ['Monday', 'Tuesday', 'Wendsday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map( v => {
            return(
              <Flex
                flexDirection={'column'}
                borderWidth="1px"
                rounded="lg"
                shadow="1px 1px 3px rgba(0,0,0,0.3)"
                p={6}
                width={'130px'}
                minHeight={'70px'}
                m="6px"
                justifyContent={'space-between'}
                bgColor={'green.900'}
                color={'whiteAlpha.800'}
              >
                { v }
              </Flex>
            )
          })
        }
      </Flex>
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
    </>
  )
}
