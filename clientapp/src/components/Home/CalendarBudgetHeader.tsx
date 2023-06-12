import React from 'react';
import {
  Box,
  Flex,
  Text,
} from '@chakra-ui/react';
import { BudgetState } from '../../atoms/BudgetAtom';
import { getNumberOfDaysForMonth } from '../../common/utils/date-and-time/commn-util-date-and-time';

type CalendarBudgetProps = {
  budgetRecoil: BudgetState;
  date: Date;
};

const CalendarBudgetHeader: React.FC<CalendarBudgetProps> = ({
  budgetRecoil,
  date,
}) => {

  const getDayBudget = (): number => {
    if(budgetRecoil.amount) {
      const a = getNumberOfDaysForMonth(date.getFullYear(), date.getMonth());
      const aFixed = a.toFixed(2);
      const aFloat = parseFloat(aFixed);
      const b = (budgetRecoil.amount/ aFloat);
      return parseFloat(b.toFixed(2));
    }

    return 0;
  }
  return (
    <Flex
      borderWidth="1px"
      rounded="lg"
      width={'100%'}
      shadow="1px 1px 3px rgba(0,0,0,0.3)"
      maxWidth={1000}
      p={6}
      m="10px auto"
      justifyContent={'space-between'}
    >
      <Box>
        <Flex>
          <Text fontWeight={800} pr={3}>
            Week view
          </Text>
          <Text fontWeight={800} pl={3}>
            Month view
          </Text>

        </Flex>
      </Box>
      <Box>
        <Text fontWeight={800} pl={3}>
          Budget: {budgetRecoil.amount}
        </Text>
      </Box>
      <Box>
        <Text fontWeight={800}>
          { getDayBudget() } zł
        </Text>
      </Box>
      <Box>
        <Text fontWeight={800}>
          Next day
        </Text>
      </Box>
    </Flex>
  )
}
export default CalendarBudgetHeader;