import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Text,
} from '@chakra-ui/react';
import { ICategory } from '../domains/models/ICategory';
import { GetExpensesBy, RemoveExpense, UpdateExpense } from '../domains/expenses/expenses-gateway';
import GetCategoriesByUserId from '../domains/categories/categories-gateway';
import NewExpenseForm from '../components/newExpenseForm/NewExpenseForm';
import { NewExpense } from '../domains/models/NewExpense';
import { emptyNewExpense } from '../common/data/mocks';
import { changeDay } from '../common/utils/date-and-time/commn-util-date-and-time';
import ExpensesTable from '../components/ExpensesTable/ExpensesTable';
import ExpensesHeader from '../components/Home/ExpensesHeader';
import { Expense } from '../domains/models/Expense';

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
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
    GetExpensesBy("sad", nowDay).then((expenses_: Expense[] | number) => {
      if(typeof expenses_ !== 'number' ) {
        setExpenses(prev => expenses_);
        countTotalDay(expenses_);
      }
    });
  }

  const countTotalDay = (expenses_: Expense[]) => {
    let total: number = 0;
    expenses_.forEach(expense => {
      total += expense.amount;
    });

    setTotalDay(total);
  }

  const getCategories = () => {
    GetCategoriesByUserId("sad").then((val: ICategory[]) => {
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
      note: expense.note,
      amount: expense.amount,
    });
  }

  const handleUpdateExpense = () => {
    const newExpenses = [...expenses];
    const foundedExpense: number = newExpenses.findIndex(c => c.id === nowEdit)!;

    const newExpense = new Expense({ 
      id: newExpenses[foundedExpense].id,
      category: nowEditValue.category,
      note: nowEditValue.note,
      amount: parseFloat(nowEditValue.amount.toString()),
      date: newExpenses[foundedExpense].date.toString(),
      userId: newExpenses[foundedExpense].userId,
    });

    newExpenses.splice(foundedExpense, 1, newExpense);

    UpdateExpense(newExpense).then((response: number) => {
      if(response === 1) {
        setExpenses(newExpenses);
        countTotalDay(newExpenses);
        setNowEdit(null);
        setNowEditValue(emptyNewExpense);
      }
    });
  }

  const handleCancel = () => {
    setNowEdit(null);
    setNowEditValue(emptyNewExpense);
  }

  const handleRemove = (id: string) => {
    RemoveExpense(id).then((resp: number) => {
      const newExpenses = [...expenses.filter(c => c.id !== id)];
      setExpenses(newExpenses);
      countTotalDay(newExpenses);
    });
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
