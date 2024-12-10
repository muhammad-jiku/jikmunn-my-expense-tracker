'use client';

import { ExpenseType } from '@/types';
import { Trash } from 'lucide-react';

function ExpenseList({ expenseLists }: { expenseLists: ExpenseType[] | null }) {
  return (
    <div className='mt-3'>
      <div className='grid grid-cols-4 p-2 bg-slate-200'>
        <h2 className='font-bold'>Name</h2>
        <h2 className='font-bold'>Amount</h2>
        <h2 className='font-bold'>Date</h2>
        <h2 className='font-bold'>Action</h2>
      </div>
      {expenseLists?.map((expense: ExpenseType, idx: number) => (
        <div className='grid grid-cols-4 p-2 bg-slate-50' key={idx}>
          <h2>{expense?.name}</h2>
          <h2>{expense?.amount}</h2>
          <h2>{expense?.createdAt}</h2>
          <h2>
            <Trash className='text-red-600' />
          </h2>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;
