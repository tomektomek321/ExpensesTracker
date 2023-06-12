import React from 'react';
import {
  Box,
  Flex,
  Text,
} from '@chakra-ui/react';

type ExpenseRowProps = {
  totalDay: number;
  date: Date;
  showDay: (shift: number) => void;
};

const ExpensesHeader: React.FC<ExpenseRowProps> = ({
  totalDay,
  date,
  showDay,
}) => {

  const displayDate = () => {
    return <Text fontWeight={800}>
            {date.getDate()} / {date.getMonth()} / {date.getFullYear()}
          </Text>
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
        <Text fontWeight={800} onClick={() => showDay(-1)}>
          Previous day
        </Text>
      </Box>
      <Box>
        {displayDate()}
      </Box>
      <Box>
        <Text fontWeight={800}>
          {totalDay} zł
        </Text>
      </Box>
      <Box>
        <Text fontWeight={800} onClick={() => showDay(1)}>
          Next day
        </Text>
      </Box>
    </Flex>
  )
}
export default ExpensesHeader;