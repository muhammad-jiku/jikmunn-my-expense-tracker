'use client';

import { BudgetType } from '@/types';
import { useUser } from '@clerk/nextjs';
import { ArrowLeftCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import BudgetItem from './BudgetItem';
import CreateBudget from './CreateBudget';

function BudgetList() {
  const { user } = useUser();
  const [budgetLists, setBudgetLists] = useState<BudgetType[]>([]);
  const router = useRouter();

  // Wrap the function in useCallback
  const getBudgetLists = useCallback(async () => {
    const response = await fetch('/api/get-budget-lists', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Email': user?.primaryEmailAddress?.emailAddress || '',
      },
    });

    const result = await response.json();
    setBudgetLists(result);
  }, [user?.primaryEmailAddress?.emailAddress]); // Include dependencies

  useEffect(() => {
    if (user) getBudgetLists();
  }, [user, getBudgetLists]); // Dependencies include the user and the callback

  return (
    <div className='mt-7'>
      <h2 className='font-bold text-3xl my-3'>
        {' '}
        <span className='flex items-center justify-start gap-2'>
          <ArrowLeftCircle
            className='cursor-pointer'
            onClick={() => {
              router.back();
            }}
          />
          My Budgets{' '}
        </span>
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-2'>
        <CreateBudget refreshData={() => getBudgetLists()} />
        {budgetLists?.length > 0
          ? budgetLists.map((budget, idx) => (
              <BudgetItem key={idx} budget={budget} />
            ))
          : // : Array.from(
            //     {
            //       length: budgetLists?.length || 0
            //     },
            //     (_, idx) => idx + 1
            //   ).map((num) => (
            //     <div
            //       key={num}
            [1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                className='w-full bg-slate-200 rounded-lg h-[150px] animate-pulse'
              ></div>
            ))}
      </div>
    </div>
  );
}

export default BudgetList;
