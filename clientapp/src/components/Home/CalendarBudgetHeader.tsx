import React from 'react';
import {
  Box,
  Flex,
  Text,
} from '@chakra-ui/react';
import { budgetState } from '../../atoms/BudgetAtom';
import { getNumberOfDaysForMonth } from '../../common/utils/date-and-time/commn-util-date-and-time';
import { useRecoilState } from 'recoil';
import { appState } from '../../atoms/AppAtom';
import { ViewType } from '../../domains/enums/ViewType';
import { countDayBudget } from '../../common/utils/budget/common-util-budget';

const CalendarBudgetHeader: React.FC = () => {
  const [budgetRecoil, setBudgetState] = useRecoilState(budgetState);
  const [appRecoil, setAppState] = useRecoilState(appState);

  const getDayBudget = (): number => {
    if(budgetRecoil.amount) {
      const a = getNumberOfDaysForMonth(appRecoil.date);
      const b = countDayBudget(a, budgetRecoil.amount);
      return parseFloat(b.toFixed(2));
    }

    return 0;
  }

  const changeView = (type: ViewType) => {
    setAppState(prev => {
      return { ...prev, viewType: type, }
    });
  }

  return (
    <Flex
      rounded="lg"
      width={'100%'}
      maxWidth={1000}
      m="10px auto"
      justifyContent={'space-between'}
    >
      <Box>
        <Flex>
          <Text fontWeight={800} pr={3} shadow="0px 0px 3px rgba(0,0,0,0.6)" p={6} onClick={() => changeView(ViewType.Weekly)}>
            Weekly view
          </Text>
          <Text fontWeight={800} pl={3} shadow="0px 0px 3px rgba(0,0,0,0.6)" p={6} onClick={() => changeView(ViewType.Monthly)}>
            Month view
          </Text>
          <Text fontWeight={800} pl={3} shadow="0px 0px 3px rgba(0,0,0,0.6)" p={6} onClick={() => changeView(ViewType.Day)}>
            Day view
          </Text>
        </Flex>
      </Box>
      <Box>
        <Text fontWeight={800} pl={3} shadow="0px 0px 3px rgba(0,0,0,0.6)" p={6}>
          {budgetRecoil.period} Budget: {budgetRecoil.amount || 0}
        </Text>
      </Box>
      <Box>
        <Text fontWeight={800} shadow="0px 0px 3px rgba(0,0,0,0.6)" p={6}>
          Budget per day: { getDayBudget() } zł
        </Text>
      </Box>
    </Flex>
  )
}
export default CalendarBudgetHeader;