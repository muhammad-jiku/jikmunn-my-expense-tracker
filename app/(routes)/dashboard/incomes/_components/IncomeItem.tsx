'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { IncomeType } from '@/types';
import { formatNumber } from '@/utils';
import { useUser } from '@clerk/nextjs';
import { Trash } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import EditIncome from './EditIncome';

function IncomeItem({
  income,
  getIncomeLists,
}: {
  income: IncomeType;
  getIncomeLists: () => void;
}) {
  const { user } = useUser();

  const onDeleteIncome = async (id: number) => {
    const data = {
      id: Number(id),
    };

    const response = await fetch('/api/delete-income', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data,
      }),
    });

    const result = await response.json();

    if (result) {
      toast('Income source deleted!');
      getIncomeLists();
    }
  };

  useEffect(() => {
    if (user) {
      getIncomeLists();
    }
  }, [user, getIncomeLists]); // Dependencies include the user and the callback

  return (
    <div className='p-5 border rounded-lg hover:shadow-md cursor-pointer h-[170px]'>
      <div className='flex gap-2 justify-between'>
        <div className='flex gap-2 items-center'>
          <h2 className='text-2xl p-3 px-4 bg-slate-100 rounded-full'>
            {income?.icon}
          </h2>
          <div>
            <h2 className='text-md font-bold'>{income?.name}</h2>
            <h2 className='text-sm text-slate-400'>earning per year</h2>
          </div>
        </div>
        <h2 className='font-bold text-primary text-lg'>
          ${formatNumber(income?.amount)}
        </h2>
      </div>
      <div className='mt-5'>
        <div className='flex items-center justify-between mb-2'>
          <div className='flex items-center justify-between gap-2'>
            <EditIncome
              income={income}
              refreshData={() => {
                getIncomeLists();
              }}
            />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className='flex gap-2' variant={'destructive'}>
                  <Trash /> Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your income source and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className='bg-red-500 text-white hover:bg-red-600 hover:text-slate-200 cursor-pointer'
                    onClick={() => {
                      onDeleteIncome(income?.id);
                    }}
                  >
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IncomeItem;
