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
import { ICategory } from '../../domains/models/ICategory';
import { NewExpense } from '../../domains/models/NewExpense';
import { emptyNewExpense, testUserId } from '../../common/data/mocks';
import { SaveExpense } from '../../domains/expenses/expenses-gateway';
import { makeRandomID } from '../../common/utils/randomID';
import { useRecoilValue } from 'recoil';
import { appState } from '../../atoms/AppAtom';

type NewExpenseFormProps = {
  expenses: Expense[];
  setExpenses: any;
  categories: ICategory[],
  countTotalDay: any,
};

const NewExpenseForm: React.FC<NewExpenseFormProps> = ({
  expenses,
  setExpenses,
  categories,
  countTotalDay
}) => {
  const appRecoil = useRecoilValue(appState);
  const [newExpenseValue, setNewExpenseValue] =  useState<NewExpense>(emptyNewExpense);

  const handleSetNewExpenseValue = (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewExpenseValue(prev => {
      return { ...prev, [ev.target.name]: ev.target.value };
    });
  }

  const handleClear = () => {
    setNewExpenseValue(emptyNewExpense);
  }

  const handleCreate = () => {
    const newExpenses: Expense[] = [...expenses];

    const ob = new Expense({
      id: makeRandomID(),
      note: newExpenseValue.note,
      category: newExpenseValue.category,
      amount: parseFloat(newExpenseValue.amount.toString()),
      date: appRecoil.date.toString(),
      userId: testUserId,
    });

    newExpenses.push(ob);

    SaveExpense(ob).then((response: number) => {
      if(response === 1) {
        setExpenses(newExpenses);
        countTotalDay(newExpenses);
        setNewExpenseValue(emptyNewExpense);
      }
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
            htmlFor="category"
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
            name="category"
            autoComplete="category"
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
              categories?.map(val => {
                return(
                  <option key={val.id}>{val.name}</option>
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