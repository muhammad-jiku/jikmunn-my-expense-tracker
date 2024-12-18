'use client';

import { IncomeType } from '@/types';
import { useUser } from '@clerk/nextjs';
import { ArrowLeftCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import CreateIncome from './CreateIncome';
import IncomeItem from './IncomeItem';

function IncomeList() {
  const { user } = useUser();
  const router = useRouter();
  const [incomeList, setIncomeList] = useState<IncomeType[]>([]);

  // Wrap the function in useCallback
  const getIncomeLists = useCallback(async () => {
    const response = await fetch('/api/get-income-lists', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Email': user?.primaryEmailAddress?.emailAddress || '',
      },
    });

    const result = await response.json();
    setIncomeList(result);
  }, [user?.primaryEmailAddress?.emailAddress]); // Include dependencies

  useEffect(() => {
    if (user) getIncomeLists();
  }, [user, getIncomeLists]); // Dependencies include the user and the callback

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
          My Income Sources{' '}
        </span>
      </h2>
      <div
        className='grid grid-cols-1
        md:grid-cols-2 lg:grid-cols-3 gap-5'
      >
        <CreateIncome refreshData={() => getIncomeLists()} />
        {incomeList?.length > 0
          ? incomeList.map((income, index) => (
              <IncomeItem
                income={income}
                key={index}
                getIncomeLists={getIncomeLists}
              />
            ))
          : [1, 2, 3, 4, 5].map((item, index) => (
              <div
                key={index}
                className='w-full bg-slate-200 rounded-lg
        h-[150px] animate-pulse'
              ></div>
            ))}
      </div>
    </div>
  );
}

export default IncomeList;
