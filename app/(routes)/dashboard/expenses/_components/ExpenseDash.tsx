'use client';

import { ExpenseType } from '@/types';
import { useUser } from '@clerk/nextjs';
import { ArrowLeftCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import ExpenseList from '../[id]/_components/ExpenseList';

function ExpenseDash() {
  const { user } = useUser();
  const [expenseLists, setExpenseLists] = useState<ExpenseType[]>([]);
  const router = useRouter();

  // Wrap the function in useCallback
  const getExpenseLists = useCallback(async () => {
    const response = await fetch('/api/get-all-expense-lists', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Email': user?.primaryEmailAddress?.emailAddress || '',
      },
    });

    const result = await response.json();
    setExpenseLists(result);
  }, [user?.primaryEmailAddress?.emailAddress]); // Include dependencies

  useEffect(() => {
    if (user) {
      getExpenseLists();
    }
  }, [user, getExpenseLists]); // Dependencies include the user and the callback

  return (
    <div className='mt-6 grid grid-cols-1 gap-3'>
      <h2 className='font-bold text-3xl'>
        {' '}
        <span className='flex items-center justify-start gap-2'>
          <ArrowLeftCircle
            className='cursor-pointer'
            onClick={() => {
              router.back();
            }}
          />
          My Expenses{' '}
        </span>
      </h2>
      <div className='mt-2'>
        <ExpenseList
          expenseLists={expenseLists || []}
          refreshData={() => {
            getExpenseLists();
          }}
        />
      </div>
    </div>
  );
}

export default ExpenseDash;
