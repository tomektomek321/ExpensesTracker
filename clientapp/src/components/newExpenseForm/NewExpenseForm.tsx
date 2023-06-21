import React, { useState } from 'react';
import {
  Box,
  ButtonGroup,
  Button,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import { Expense } from '../../domains/models/Expense';
import { NewExpense } from '../../domains/models/NewExpense';
import { emptyNewExpense } from '../../common/data/mocks';
import { createGuid } from '../../common/utils/randomID';
import { useRecoilState, useRecoilValue } from 'recoil';
import { appState } from '../../atoms/AppAtom';
import { ExpensesGateway } from '../../domains/expenses/expenses-gateway';
import { categoriesState } from '../../atoms/CategoriesAtom';

type NewExpenseFormProps = {
  expenses: Expense[];
  setExpenses: any;
  countTotalDay: any,
};

const NewExpenseForm: React.FC<NewExpenseFormProps> = ({
  expenses,
  setExpenses,
  countTotalDay,
}) => {
  const appRecoil = useRecoilValue(appState);
  const [newExpenseValue, setNewExpenseValue] =  useState<NewExpense>(emptyNewExpense);
  const [categoriesRecoil, setCategoriesRecoil] = useRecoilState(categoriesState);

  const handleSetNewExpenseValue = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewExpenseValue(prev => {
      return { ...prev, [name]: value };
    });
  }

  const handleClear = () => {
    setNewExpenseValue(prev => ({
      ...prev, 
      amount: emptyNewExpense.amount,
      note: emptyNewExpense.note,
    }));
  }

  const handleCreate = () => {
    const newExpenses: Expense[] = [...expenses];

    const ob = new Expense({
      id: createGuid(),
      note: newExpenseValue.note,
      categoryId: newExpenseValue.categoryId,
      amount: parseFloat(newExpenseValue.amount.toString()),
      date: appRecoil.date.toString(),
      userId: "e8931788-279e-46a3-951a-5a0ace4c9c8c",
    });

    ExpensesGateway.saveExpense(ob).then((response: Expense) => {
      newExpenses.push(response);
      setExpenses(newExpenses);
      countTotalDay(newExpenses);
      setNewExpenseValue(prev => ({
        ...prev, 
        amount: emptyNewExpense.amount,
        note: emptyNewExpense.note,
      }));
    });
  }

  return (
    <>
      <Flex mt={5} direction={'column'}>
        <Box my={5} fontSize={20} fontWeight={700}>
          Add Next Expense
        </Box>
        <FormControl mr="5%">
          <FormLabel htmlFor="note" fontWeight={'normal'}>
            Name
          </FormLabel>
          <Input name="note" value={newExpenseValue.note} placeholder="Note" border={'1px solid gray'} onChange={(e) => handleSetNewExpenseValue(e)} />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="amount" fontWeight={'normal'}>
            Amount
          </FormLabel>
          <Input name="amount" value={newExpenseValue.amount} placeholder="amount" border={'1px solid gray'} onChange={(e) => handleSetNewExpenseValue(e)} />
        </FormControl>

        <FormControl as={GridItem}>
          <FormLabel
            mt={3}
            htmlFor="categoryId"
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: 'gray.50',
            }}
          >
            Category
          </FormLabel>
          <Select
            mt={1}
            name="categoryId"
            autoComplete="categoryId"
            placeholder="Select option"
            focusBorderColor="brand.400"
            border={'1px solid gray'} 
            shadow="sm"
            size="md"
            w="full"
            onChange={(e) => handleSetNewExpenseValue(e)}
            rounded="md"
          >
            {
              categoriesRecoil.categories?.map(val => {
                return(
                  <option key={val.id} value={val.id}>{val.name}</option>
                )
              })
            }
          </Select>
        </FormControl>
      </Flex>
      <ButtonGroup mt="5%" w="100%">
        <Flex w="100%" justifyContent="space-between">
          <Flex>
            <Button
              colorScheme="teal"
              variant="solid"
              w="7rem"
              onClick={handleCreate}
              mr="5%">
              Add
            </Button>
            <Button
              w="7rem"
              onClick={handleClear}
              colorScheme="teal"
              variant="outline">
              Clear
            </Button>
          </Flex>
        </Flex>
      </ButtonGroup>
    </>
  )
}
export default NewExpenseForm;