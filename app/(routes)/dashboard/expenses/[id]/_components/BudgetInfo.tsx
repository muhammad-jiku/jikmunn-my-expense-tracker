'use client';

import { BudgetType } from '@/types';
import { useUser } from '@clerk/nextjs';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import BudgetItem from '../../../budgets/_components/BudgetItem';
import CreateExpense from './CreateExpense';

function BudgetInfo() {
  const params = useParams(); // Directly call useParams
  const id = params?.id as string; // Extract the `id`

  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState<BudgetType[]>([]);

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
    if (user) getBudgetInfo();
  }, [user, getBudgetInfo]); // Dependencies include the user and the callback

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-2'>
      {budgetInfo?.length > 0 ? (
        <>
          <BudgetItem budget={budgetInfo[0]} />
          <CreateExpense id={id} refreshData={() => getBudgetInfo()} />
        </>
      ) : (
        <div className='w-full bg-slate-200 rounded-lg h-[150px] animate-pulse'></div>
      )}
    </div>
  );
}

export default BudgetInfo;
