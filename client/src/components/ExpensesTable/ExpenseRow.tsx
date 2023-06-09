import React from 'react';
import {
  Button,
  Input,
  Select,
  Td,
  Tr
} from '@chakra-ui/react';
import { Expense } from '../../domains/models/Expense';
import { Category } from '../../domains/models/Category';
import { NewExpense } from '../../domains/models/NewExpense';
import { MdBuild } from 'react-icons/md';

type ExpenseRowProps = {
  idx: number;
  expense: Expense;
  nowEdit: string | null;
  categories: Category[];
  handleEditInputValue: (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
  nowEditValue: NewExpense,
  handleCancel: () => void,
  handleUpdateExpense: () => void,
  handleRemove: (id: string) => void,
  handleEditCategory: (id: string) => void,
};

const ExpenseRow: React.FC<ExpenseRowProps> = ({
  idx,
  expense,
  nowEdit,
  categories,
  handleEditInputValue,
  nowEditValue,
  handleCancel,
  handleUpdateExpense,
  handleRemove,
  handleEditCategory
}) => {
  return (
    <Tr key={expense.id}>
      <Td>{idx}</Td>
      <Td>
        {
          nowEdit == null || nowEdit !== expense.id ? (
            expense.name
          ) : (
            <>
              <Input border={'1px solid gray'} focusBorderColor='pink.400' name="name" htmlSize={6} width='auto' color='teal' value={nowEditValue.name} onChange={(e) => { handleEditInputValue(e);  }} />
            </>
          )
        }
      </Td>
      <Td>
        {
          nowEdit == null || nowEdit !== expense.id ? (
            expense.price
          ) : (
            <>
              <Input border={'1px solid gray'} focusBorderColor='pink.400' name='price' htmlSize={1} width='auto' color='teal' value={nowEditValue.price} onChange={(e) => { handleEditInputValue(e); }} />
            </>
          )
        }
      </Td>
      <Td>
      {
          nowEdit == null || nowEdit !== expense.id ? (
            expense.category
          ) : (
            <>
              <Select
                mt={1}
                name="category"
                autoComplete="category"
                placeholder="Select option"
                focusBorderColor="brand.400"
                border={'1px solid gray'} 
                shadow="sm"
                size="md"
                w="full"
                value={nowEditValue.category}
                onChange={(e) => handleEditInputValue(e)}
                rounded="md">
                  {
                    categories?.map(val => {
                      return(
                        <option key={val.id} value={val.name}>{val.name}</option>
                      )
                    })
                  }
              </Select>
            </>
          )
        }
      </Td>
      <Td>
        {
          nowEdit == null || nowEdit !== expense.id ? (
            <>
              <Button leftIcon={<MdBuild />} colorScheme='pink' variant='outline' onClick={() => handleEditCategory(expense.id) } >Edit</Button>
            </>
          ) : (
            <>
              <Button leftIcon={<MdBuild />} colorScheme='pink' variant='outline' onClick={handleUpdateExpense}>Update</Button>
              <Button leftIcon={<MdBuild />} colorScheme='pink' variant='outline' onClick={handleCancel}>Cancel</Button>
            </>
          )
        }
      </Td>
      <Td>
        <Button colorScheme='teal' size='md' onClick={() => handleRemove(expense.id)}>Remove</Button>
      </Td>
    </Tr>
  )
}
export default ExpenseRow;