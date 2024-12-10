'use client';

import { BudgetType, ExpenseType } from '@/types';
import { useUser } from '@clerk/nextjs';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import BudgetItem from '../../../budgets/_components/BudgetItem';
import CreateExpense from './CreateExpense';
import ExpenseList from './ExpenseList';

function BudgetInfo() {
  const params = useParams(); // Directly call useParams
  const id = params?.id as string; // Extract the `id`

  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState<BudgetType[]>([]);
  const [expenseLists, setExpenseLists] = useState<ExpenseType[] | null>([]); // Initialize with `null` to detect loading state

  // Wrap the function in useCallback
  const getExpenseLists = useCallback(async () => {
    const response = await fetch(`/api/get-expense-lists?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'X-User-Email': user?.primaryEmailAddress?.emailAddress || '',
      },
    });

    const result = await response.json();
    setExpenseLists(result);
  }, [id]); // Include dependencies

  // Wrap the function in useCallback
  const getBudgetInfo = useCallback(async () => {
    const response = await fetch(`/api/get-budget-info?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Email': user?.primaryEmailAddress?.emailAddress || '',
      },
    });

    const result = await response.json();
    console.log(result);
    setBudgetInfo(result);
  }, [user?.primaryEmailAddress?.emailAddress, id]); // Include dependencies

  useEffect(() => {
    if (user) {
      getExpenseLists();
      getBudgetInfo();
    }
  }, [user, getExpenseLists, getBudgetInfo]); // Dependencies include the user and the callback

  return (
    <div className='grid grid-cols-1'>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-2'>
        {budgetInfo?.length > 0 ? (
          <>
            <BudgetItem budget={budgetInfo[0]} />
            <CreateExpense
              id={id}
              refreshData={() => {
                getExpenseLists();
                getBudgetInfo();
              }}
            />
          </>
        ) : (
          <div className='w-full bg-slate-200 rounded-lg h-[150px] animate-pulse'></div>
        )}
      </div>
      <div className='mt-4'>
        <h2 className='text-lg font-bold'>Latest Expenses</h2>
        <ExpenseList expenseLists={expenseLists || []} />
      </div>
    </div>
  );
}

export default BudgetInfo;
