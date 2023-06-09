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
import { Category } from '../../domains/models/Category';
import { NewExpense } from '../../domains/models/NewExpense';

type NewExpenseFormProps = {
  expsenses: Expense[];
  setExpenses: any;
  categories: Category[],
};

const NewExpenseForm: React.FC<NewExpenseFormProps> = ({
  expsenses,
  setExpenses,
  categories,
}) => {
  
  const [newExpenseValue, setNewExpenseValue] =  useState<NewExpense>({
    category: "",
    name: "",
    price: 0,
  });

  const handleSetNewExpenseValue = (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewExpenseValue(prev => {
      return { ...prev, [ev.target.name]: ev.target.value };
    });
  }
  
  const handleClear = () => {
    setNewExpenseValue({
      category: "",
      name: "",
      price: 0,
    });
  }

  const handleCreate = () => {
    const newExpenses: Expense[] = [...expsenses];
    newExpenses.push({
      id: "123213", 
      name: newExpenseValue.name, 
      category: newExpenseValue.category,
      price: newExpenseValue.price, 
      userId: "123213"
    });
    setExpenses(newExpenses);

    setNewExpenseValue({
      category: "",
      name: "",
      price: 0,
    });
  }

  return (
    <>
      <Flex mt={5} direction={'column'}>
        <Box my={5} fontSize={20} fontWeight={700}>
          Add Next Expense
        </Box>
        <FormControl mr="5%">
          <FormLabel htmlFor="name" fontWeight={'normal'}>
            Name
          </FormLabel>
          <Input name="name" placeholder="Name" border={'1px solid gray'} onChange={(e) => handleSetNewExpenseValue(e)} />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="price" fontWeight={'normal'}>
            Price
          </FormLabel>
          <Input name="price" placeholder="price" border={'1px solid gray'} onChange={(e) => handleSetNewExpenseValue(e)} />
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
            }}>
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
            rounded="md">
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