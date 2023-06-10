import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Text,
} from '@chakra-ui/react';
import { Category } from '../domains/models/Category';
import GetExpensesBy from '../domains/expenses/expenses-gateway';
import { Expense } from '../domains/models/Expense';
import GetCategoriesByUserId from '../domains/categories/categories-gateway';
import NewExpenseForm from '../components/newExpenseForm/NewExpenseForm';
import { NewExpense } from '../domains/models/NewExpense';
import { emptyNewExpense } from '../common/data/mocks';
import { changeDay } from '../common/utils/date-and-time/commn-util-date-and-time';
import ExpensesTable from '../components/ExpensesTable/ExpensesTable';
import ExpensesHeader from '../components/Home/ExpensesHeader';

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [nowEdit, setNowEdit] =  useState<string | null>(null);
  const [nowEditValue, setNowEditValue] =  useState<NewExpense>(emptyNewExpense);
  const [date, setDate] = useState<Date>(new Date());
  const [totalDay, setTotalDay] = useState<number>(0);
  const [dayShift, setDayShift] = useState<number>(0);

  useEffect(() => {
    getExpenses();
    getCategories();
  }, []);

  useEffect(() => {
    getExpenses();
  }, [dayShift]);


  const getExpenses = () => {
    const nowDay = changeDay(dayShift);
    GetExpensesBy("sad", nowDay).then((expenses_: Expense[]) => {
      
      setExpenses(prev => expenses_);
      countTotalDay(expenses_);
    });
  }

  const countTotalDay = (expenses_: Expense[]) => {
    let total: number = 0;
    expenses_.forEach(expense => {
      total += expense.price;
    });

    setTotalDay(total);
  }

  const getCategories = () => {
    GetCategoriesByUserId("sad").then((val: Category[]) => {
      setCategories(val);
    })
  }

  const showDay = (shift: number) => {
    setDayShift(prev => prev + shift);
    setDate(changeDay(dayShift + shift));
  }

  const displayDate = () => {
    return <Text fontWeight={800}>
            {date.getDate()} / {date.getMonth()} / {date.getFullYear()}
          </Text>
  }

  const handleEditCategory = (id: string) => {
    setNowEdit(id);

    const expense = expenses.find(e => e.id === id)!;

    setNowEditValue({
      category: expense.category,
      name: expense.name,
      price: expense.price,
    });
  }

  const handleUpdateExpense = () => {
    const newExpenses = [...expenses];
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
      <ExpensesHeader 
        totalDay={totalDay}
        displayDate={displayDate}
        showDay={showDay}
      />
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={1000}
        p={6}
        m="10px auto"
        as="form"
      >
        {
          expenses.length === 0 ? (
            <Text width={'1000px'} fontSize={25} textAlign={'center'}>
              NO EXPENSES ADDED YET
            </Text>
          ) : (
            <ExpensesTable
              expenses={expenses}
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
        }
        <NewExpenseForm 
          expenses={expenses}
          setExpenses={setExpenses}
          categories={categories}
          countTotalDay={countTotalDay}
        />
      </Box>
    </Flex>
  )
}
