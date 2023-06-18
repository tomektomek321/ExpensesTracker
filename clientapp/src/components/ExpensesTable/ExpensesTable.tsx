import React from 'react';
import {
  Flex,
  Table, 
  TableContainer, 
  Tbody, 
  Th, 
  Thead, 
  Tr,
} from '@chakra-ui/react';

import { Expense } from '../../domains/models/Expense';
import { NewExpense } from '../../domains/models/NewExpense';
import ExpenseRow from './ExpenseRow';

type ExpenseRowProps = {
  expenses: Expense[];
  nowEdit: string | null;
  handleEditInputValue: (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
  nowEditValue: NewExpense,
  handleCancel: () => void,
  handleUpdateExpense: () => void,
  handleRemove: (id: string) => void,
  handleEditCategory: (id: string) => void,
};

const ExpensesTable: React.FC<ExpenseRowProps> = ({
  expenses,
  nowEdit,
  handleEditInputValue,
  nowEditValue,
  handleCancel,
  handleUpdateExpense,
  handleRemove,
  handleEditCategory
  }) => {
  return (
    <Flex direction={'column'}>
      <TableContainer width={'1000px'}>
        <Table variant='striped' colorScheme='teal'>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Name</Th>
              <Th>Value</Th>
              <Th>Category</Th>
              <Th>EDIT</Th>
              <Th>REMOVE</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              expenses.map((expense: Expense, idx: number) => {
                return(
                  <ExpenseRow
                    key={idx}
                    idx={idx}
                    expense={expense}
                    nowEdit={nowEdit}
                    handleEditInputValue={handleEditInputValue}
                    nowEditValue={nowEditValue}
                    handleCancel={handleCancel}
                    handleUpdateExpense={handleUpdateExpense}
                    handleRemove={handleRemove}
                    handleEditCategory={handleEditCategory}
                  />
                )
              })
            }
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  )
}
export default ExpensesTable;