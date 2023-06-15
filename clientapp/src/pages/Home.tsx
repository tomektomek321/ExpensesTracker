import React, { useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import { ViewType } from '../domains/enums/ViewType';
import DayView from '../components/Home/DayView';
import { useRecoilState, useRecoilValue } from 'recoil';
import { appState } from '../atoms/AppAtom';
import MonthlyView from '../components/Home/MonthlyView';
import WeeklyView from '../components/Home/WeeklyView';
import CalendarBudgetHeader from '../components/Home/CalendarBudgetHeader';
import { getPersistedUser } from '../domains/expenses/expenses-gateway';
import { authState } from '../atoms/AuthAtom';

// Dwa endpointy - 
// /api/user/register - bierze username, email i password
// /api/user/login - username i password - zwraca JWT

export default function Home() {
  const appRecoil = useRecoilValue(appState);
  const [authRecoil, setAuthRecoil] = useRecoilState(authState);

  useEffect(() => {
    getPersistedUser().then( user => {
      if(user) {
        setAuthRecoil(prev => {
          return {
            ...prev,
            email: user.email,
            token: user.token,
            logged: true,
            displayName: user.email.split("@")[0],
          }
        });
      }
    }).catch(e => {
      console.log('persistedUser error')
      console.log(e);
    })
    
  }, [])
  
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
