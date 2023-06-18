import React, { useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import { ViewType } from '../domains/enums/ViewType';
import DayView from '../components/Home/DayView';
import { useRecoilState, useRecoilValue } from 'recoil';
import { appState } from '../atoms/AppAtom';
import MonthlyView from '../components/Home/MonthlyView';
import WeeklyView from '../components/Home/WeeklyView';
import CalendarBudgetHeader from '../components/Home/CalendarBudgetHeader';
import { authState } from '../atoms/AuthAtom';
import { AuthGateway } from '../domains/auth/auth-gateway';
import { RecoilSignIn } from '../atoms/auth-atom-utils';

export default function Home() {
  const appRecoil = useRecoilValue(appState);
  const [authRecoil, setAuthRecoil] = useRecoilState(authState);

  useEffect(() => {
    AuthGateway.getPersistedUser().then( user => {
      if(user) {
        RecoilSignIn(setAuthRecoil, user.username, user.token)
      }
    }).catch(e => {
      console.log('getPersistedUser error')
      console.log(e);
    });
  }, []);
  
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
