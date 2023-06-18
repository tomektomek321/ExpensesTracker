import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
} from '@chakra-ui/react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { NewExpense } from '../../domains/models/NewExpense';
import { Expense } from '../../domains/models/Expense';
import { ICategory } from '../../domains/models/ICategory';
import { emptyNewExpense } from '../../common/data/mocks';
import { BudgetState, budgetState } from '../../atoms/BudgetAtom';
import { changeDay } from '../../common/utils/date-and-time/commn-util-date-and-time';
import { GetExpensesBy, RemoveExpense, UpdateExpense } from '../../domains/expenses/expenses-gateway';
import { Budget } from '../../domains/models/Budget';
import GetCategoriesByUserId from '../../domains/categories/categories-gateway';
import ExpensesHeader from './ExpensesHeader';
import ExpensesTable from '../ExpensesTable/ExpensesTable';
import NewExpenseForm from '../newExpenseForm/NewExpenseForm';
import { appState } from '../../atoms/AppAtom';

export default function DayView() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [nowEdit, setNowEdit] =  useState<string | null>(null);
  const [nowEditValue, setNowEditValue] =  useState<NewExpense>(emptyNewExpense);
  const [totalDay, setTotalDay] = useState<number>(0);

  const setBudgetState = useSetRecoilState(budgetState);
  const [appRecoil, setAppState] = useRecoilState(appState);

  useEffect(() => {
    getCategories();    
  }, []);

  useEffect(() => {
    getExpensesAndBudget();
  }, [appRecoil.date]);


  const getExpensesAndBudget = () => {
    GetExpensesBy("sad", appRecoil.date).then((expenses_: [Expense[], Budget] | number) => {
      if(typeof expenses_ !== 'number' ) {
        setExpenses(prev => expenses_[0]);
        countTotalDay(expenses_[0]);

        setBudgetState((prev: BudgetState) => ({
          ...prev,
          amount: expenses_[1].amount,
          period: expenses_[1].period,
        }));
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
    const day = changeDay(appRecoil.date, shift) 
    setAppState(prev => {
      return {
        ...prev,
        date: day,
      }
    })
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
    <>
      <ExpensesHeader
        totalDay={totalDay}
        date={appRecoil.date}
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
    </>
  )
}
