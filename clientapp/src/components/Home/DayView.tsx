import React, { useEffect, useState } from 'react';
import { Box, Flex, Spinner, Text } from '@chakra-ui/react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { NewExpense } from '../../domains/models/NewExpense';
import { Expense } from '../../domains/models/Expense';
import { ICategory } from '../../domains/models/ICategory';
import { emptyNewExpense } from '../../common/data/mocks';
import { BudgetState, budgetState } from '../../atoms/BudgetAtom';
import { changeDay } from '../../common/utils/date-and-time/commn-util-date-and-time';
import { UpdateExpense } from '../../domains/expenses/expenses2-gateway';
import ExpensesHeader from './ExpensesHeader';
import ExpensesTable from '../ExpensesTable/ExpensesTable';
import NewExpenseForm from '../newExpenseForm/NewExpenseForm';
import { appState } from '../../atoms/AppAtom';
import { CategoryGateway } from '../../domains/categories/categories-gateway';
import { ExpensesGateway } from '../../domains/expenses/expenses-gateway';
import { authState } from '../../atoms/AuthAtom';
import { period } from '../../domains/enums/Period';
import { categoriesState } from '../../atoms/CategoriesAtom';
import { RecoilSignOut } from '../../atoms/auth-atom-utils';

export default function DayView() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [nowEdit, setNowEdit] =  useState<string | null>(null);
  const [nowEditValue, setNowEditValue] =  useState<NewExpense>(emptyNewExpense);
  const [totalDay, setTotalDay] = useState<number>(0);
  const [loading, setLoading] =  useState<boolean>(true);

  const setBudgetState = useSetRecoilState(budgetState);
  const [appRecoil, setAppState] = useRecoilState(appState);
  const [authRecoil, setAuthRecoil] = useRecoilState(authState);
  const [categoriesRecoil, setCategoriesRecoil] = useRecoilState(categoriesState);

  useEffect(() => {
    getCategories();    
  }, []);

  useEffect(() => {
    getExpensesAndBudget();
  }, [appRecoil.date, authRecoil.logged]);

  const getExpensesAndBudget = () => {
    if(!authRecoil.logged) return;

    ExpensesGateway.getExpenses(appRecoil.date).then( (expenses: Expense[]) => {
      console.log(expenses);
      setExpenses(expenses);
      countTotalDay(expenses);
      setBudgetState((prev: BudgetState) => ({
        ...prev,
        amount: 3000,
        period: period.Monthly,
      }));
    })
    .catch(r => {
      console.log(r);
      signOutAndOpenModal();
    });
  }

  const signOutAndOpenModal = () => {
    RecoilSignOut(setAuthRecoil);
    setAppState(prev => {
      return {
        ...prev,
        viewModal: {
          ...prev.viewModal,
          open: true,
        }
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
    setLoading(true);
    CategoryGateway.getCategories().then( (categories: ICategory[]) => {
      setCategoriesRecoil(prev => {
        return {
          ...prev,
          categories,
        }
      });
      setLoading(false);
    });
  }

  const showDay = (shift: number) => {
    const day = changeDay(appRecoil.date, shift) 
    setAppState(prev => {
      return {
        ...prev,
        date: day,
      }
    });
  }

  const handleEditCategory = (id: string) => {
    setNowEdit(id);

    const expense = expenses.find(e => e.id === id)!;

    setNowEditValue({
      categoryId: expense.categoryId,
      note: expense.note,
      amount: expense.amount,
    });
  }

  const handleUpdateExpense = () => {
    const newExpenses = [...expenses];
    const foundedExpense: number = newExpenses.findIndex(c => c.id === nowEdit)!;

    const newExpense = new Expense({ 
      id: newExpenses[foundedExpense].id,
      categoryId: nowEditValue.categoryId,
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
    ExpensesGateway.deleteExpense(id).then((resp: boolean) => {
      if(resp) {
        const newExpenses = [...expenses.filter(c => c.id !== id)];
        setExpenses(newExpenses);
        countTotalDay(newExpenses);
      }
    });
  }

  const handleEditInputValue = (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNowEditValue(prev => {
      return { ...prev, [ev.target.name]: ev.target.value };
    });
  }

  if(loading) {
    return(
      <Flex direction={'column'} justifyContent="center" alignItems={'center'} p="16px 0px">
        <Spinner size='xl' />
      </Flex>
    )
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
          countTotalDay={countTotalDay}
        />
      </Box>
    </>
  )
}
