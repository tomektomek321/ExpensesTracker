import React from 'react';
import { Flex } from '@chakra-ui/react';
import { ViewType } from '../domains/enums/ViewType';
import DayView from '../components/Home/DayView';
import { useRecoilValue } from 'recoil';
import { appState } from '../atoms/AppAtom';
import MonthlyView from '../components/Home/MonthlyView';
import WeeklyView from '../components/Home/WeeklyView';
import CalendarBudgetHeader from '../components/Home/CalendarBudgetHeader';

export default function Home() {

  const appRecoil = useRecoilValue(appState);
  
  return (
    <>
      <CalendarBudgetHeader />
      <Flex justify="center" flexDirection={'column'} p="16px 0px">
        { appRecoil.viewType === ViewType.Day && <DayView /> }
        { appRecoil.viewType === ViewType.Monthly && <MonthlyView /> }
        { appRecoil.viewType === ViewType.Weekly && <WeeklyView /> }
      </Flex>
    </>
  )
}
