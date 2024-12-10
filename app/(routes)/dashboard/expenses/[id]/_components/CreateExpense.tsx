'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';

function CreateExpense({
  id,
  refreshData,
}: {
  id: string;
  refreshData: () => void;
}) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  // Function to format the date as MM/DD/YYYY
  const formatDate = (date: Date): string => {
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  // Get the current date and format it
  const currentDate = formatDate(new Date());

  const onCreateExpense = async () => {
    const data = {
      name,
      amount,
      budgetId: id,
      createdAt: currentDate,
    };

    console.log(data);
    const response = await fetch('/api/create-expense', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data,
      }),
    });

    const result = await response.json();

    if (result) {
      refreshData();
      toast('New Expense added!');
    }
  };

  return (
    <div className='border p-5 rounded-lg'>
      <h2 className='text-lg font-bold'>Add New Expense</h2>
      <div className='mt-5'>
        <div className='mt-2'>
          <h2 className='text-black font-medium my-1'>Name</h2>
          <Input
            placeholder='e.g. Decoration'
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className='mt-2'>
          <h2 className='text-black font-medium my-1'>Amount</h2>
          <Input
            placeholder='e.g. 100$'
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        </div>
      </div>
      <Button
        className='mt-5 w-full'
        disabled={!(name && amount)}
        onClick={() => onCreateExpense()}
      >
        Add Expense
      </Button>
    </div>
  );
}

export default CreateExpense;
