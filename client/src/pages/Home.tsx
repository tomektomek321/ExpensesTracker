import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Table, TableContainer, Tbody, Text, Th, Thead, Tr
} from '@chakra-ui/react';
import { Category } from '../domains/models/Category';
import GetExpensesBy from '../domains/expenses/expenses-gateway';
import { Expense } from '../domains/models/Expense';
import GetCategoriesByUserId from '../domains/categories/categories-gateway';
import NewExpenseForm from '../components/newExpenseForm/NewExpenseForm';
import { NewExpense } from '../domains/models/NewExpense';
import ExpenseRow from '../components/ExpensesTable/ExpenseRow';
import { emptyNewExpense } from '../common/data/mocks';

export default function Home() {
  const [expsenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [nowEdit, setNowEdit] =  useState<string | null>(null);
  const [nowEditValue, setNowEditValue] =  useState<NewExpense>(emptyNewExpense);
  const [date, setDate] = useState<Date>(new Date());
  const [totalDay, setTotalDay] = useState<number>(0);

  useEffect(() => {
    getExpenses();
    getCategories();
  }, []);

  const getExpenses = () => {
    GetExpensesBy("sad", 0).then((val: Expense[]) => {
      setExpenses(val);
      countTotalDay(val);
    })
  }

  const countTotalDay = (expenses: Expense[]) => {
    let total: number = 0;
    expsenses.forEach(expense => {
      total += expense.price;
    });

    setTotalDay(total);
  }

  const getCategories = () => {
    GetCategoriesByUserId("sad").then((val: Category[]) => {
      setCategories(val);
    })
  }

  const handleEditCategory = (id: string) => {
    setNowEdit(id);

    const expense = expsenses.find(e => e.id === id)!;

    setNowEditValue({
      category: expense.category,
      name: expense.name,
      price: expense.price,
    });
  }

  const handleUpdateExpense = () => {
    const newExpenses = [...expsenses];
    const foundedExpense: Expense = newExpenses.find(c => c.id === nowEdit)!;
    foundedExpense.category = nowEditValue.category;
    foundedExpense.name = nowEditValue.name;
    foundedExpense.price = nowEditValue.price;

    setExpenses(newExpenses);

    setNowEdit(null);
    setNowEditValue(emptyNewExpense);
  }

  const handleCancel = () => {
    setNowEdit(null);
    setNowEditValue(emptyNewExpense);
  }

  const handleRemove = (id: string) => {
    setExpenses(prev => prev.filter(c => c.id !== id));
  }

  const handleEditInputValue = (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNowEditValue(prev => {
      return { ...prev, [ev.target.name]: ev.target.value };
    });
  }

  return (
    <Flex justify="center" flexDirection={'column'} p="16px 0px">
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
          <Text fontWeight={800}>
            Poprzedni dzień
          </Text>
        </Box>
        <Box>
          <Text fontWeight={600}>
            {date.getDate()} / {date.getMonth()} / {date.getFullYear()}
          </Text>
        </Box>
        <Box>
          <Text fontWeight={800}>
            {totalDay} zł
          </Text>
        </Box>

      </Flex>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={1000}
        p={6}
        m="10px auto"
        as="form"
      >
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
                  expsenses.map((expense: Expense, idx: number) => {
                    return(
                      <ExpenseRow
                        key={idx}
                        idx={idx}
                        expense={expense}
                        nowEdit={nowEdit}
                        categories={categories}
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

        <NewExpenseForm 
          expsenses={expsenses}
          setExpenses={setExpenses}
          categories={categories}
        />
        
      </Box>
    </Flex>
  )
}
