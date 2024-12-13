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
import { BudgetType, ExpenseType } from '@/types';
import { useUser } from '@clerk/nextjs';
import { ArrowLeftCircle, Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import BudgetItem from '../../../budgets/_components/BudgetItem';
import CreateExpense from './CreateExpense';
import EditBudget from './EditBudget';
import ExpenseList from './ExpenseList';

function BudgetInfo() {
  const params = useParams(); // Directly call useParams
  const id = params?.id as string; // Extract the `id`
  const router = useRouter();

  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState<BudgetType[]>([]);
  const [expenseLists, setExpenseLists] = useState<ExpenseType[] | null>([]); // Initialize with `null` to detect loading state

  // Wrap the function in useCallback
  const getExpenseLists = useCallback(async () => {
    const response = await fetch(`/api/get-expense-lists?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'X-User-Email': user?.primaryEmailAddress?.emailAddress || '',
      },
    });

    const result = await response.json();
    setExpenseLists(result);
  }, [id]); // Include dependencies

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

    setBudgetInfo(result);
  }, [user?.primaryEmailAddress?.emailAddress, id]); // Include dependencies

  const onDeleteBudget = async (id: string) => {
    const data = {
      id: Number(id),
    };

    const response = await fetch('/api/delete-budget', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data,
      }),
    });

    const result = await response.json();

    if (result) {
      toast('Budget deleted!');
      router.replace('/dashboard/budgets');
    }
  };

  useEffect(() => {
    if (user) {
      getExpenseLists();
      getBudgetInfo();
    }
  }, [user, getExpenseLists, getBudgetInfo]); // Dependencies include the user and the callback

  return (
    <div>
      <h2 className='text-2xl font-bold flex justify-between items-center'>
        <span className='flex items-center justify-between gap-2'>
          <ArrowLeftCircle
            className='cursor-pointer'
            onClick={() => {
              router.back();
            }}
          />
          My Expenses{' '}
        </span>
        <div className='flex items-center justify-between gap-2'>
          <EditBudget
            budget={budgetInfo[0]}
            refreshData={() => {
              getExpenseLists();
              getBudgetInfo();
            }}
          />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className='flex gap-2' variant={'destructive'}>
                <Trash />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your budget and its expenses and remove your data from our
                  servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className='bg-red-500 text-white hover:bg-red-600 hover:text-slate-200 cursor-pointer'
                  onClick={() => {
                    onDeleteBudget(id);
                  }}
                >
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>{' '}
      </h2>
      <div className='grid grid-cols-1'>
        <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-2'>
          {budgetInfo?.length > 0 ? (
            <>
              <BudgetItem budget={budgetInfo[0]} />
              <CreateExpense
                id={id}
                refreshData={() => {
                  getExpenseLists();
                  getBudgetInfo();
                }}
              />
            </>
          ) : (
            <div className='w-full bg-slate-200 rounded-lg h-[150px] animate-pulse'></div>
          )}
        </div>
        <div className='mt-4'>
          <ExpenseList
            expenseLists={expenseLists || []}
            refreshData={() => {
              getExpenseLists();
              getBudgetInfo();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default BudgetInfo;
