'use client';

import { ExpenseType } from '@/types';
import { Trash } from 'lucide-react';
import { toast } from 'sonner';

function ExpenseList({
  expenseLists,
  refreshData,
}: {
  expenseLists: ExpenseType[] | null;
  refreshData: () => void;
}) {
  const onDeleteExpense = async (id: number) => {
    const data = {
      id,
    };

    console.log(data);
    const response = await fetch('/api/delete-expense', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data,
      }),
    });

    const result = await response.json();

    if (result) {
      refreshData();
      toast('Expense deleted!');
    }
  };

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
          <h2 className='flex items-center justify-center md:justify-start'>
            <Trash
              className='text-red-600 text-center cursor-pointer'
              onClick={() => {
                onDeleteExpense(expense?.id);
              }}
            />
          </h2>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;
