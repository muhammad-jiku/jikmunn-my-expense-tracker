'use client';

import { BudgetType } from '@/types';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import BudgetItem from './BudgetItem';
import CreateBudget from './CreateBudget';

function BudgetList() {
  const { user } = useUser();
  const [budgetLists, setBudgetLists] = useState<BudgetType[]>([]);

  useEffect(() => {
    const getBudgetLists = async () => {
      const response = await fetch('/api/get-budget-lists', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Email': user?.primaryEmailAddress?.emailAddress || '',
        },
      });

      const result = await response.json();
      setBudgetLists(result);
    };

    if (user) getBudgetLists();
  }, [user]);

  return (
    <div className='mt-7'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
        <CreateBudget />
        {budgetLists.map((budget, idx) => (
          <BudgetItem key={idx} budget={budget} />
        ))}
      </div>
    </div>
  );
}

export default BudgetList;
