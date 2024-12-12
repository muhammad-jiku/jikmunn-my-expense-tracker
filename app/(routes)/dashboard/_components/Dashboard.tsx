'use client';

import { BudgetType } from '@/types';
import { useUser } from '@clerk/nextjs';
import { useCallback, useEffect, useState } from 'react';
import BarChartDash from './BarChartDash';
import CardInfo from './CardInfo';

function Dashboard() {
  const { user } = useUser();
  const [budgetLists, setBudgetLists] = useState<BudgetType[]>([]);

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
    <div className='p-8'>
      <h2 className='font-bold text-3xl'>Hi, {user?.fullName}!</h2>
      <p className='text-gray-500'>
        Here&apos;s what happening with your savings, Let&apos;s manage your
        expense.
      </p>
      <CardInfo budgetLists={budgetLists} />
      <div className='mt-6 grid grid-cols-1 md:grid-cols-3 gap-2'>
        <div className='md:col-span-2'>
          <BarChartDash budgetLists={budgetLists} />
        </div>
        <div>Chartt</div>
      </div>
    </div>
  );
}

export default Dashboard;
