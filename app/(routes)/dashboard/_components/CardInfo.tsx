'use client';

import { BudgetType } from '@/types';
import { Banknote, Receipt, Wallet } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

function CardInfo({ budgetLists }: { budgetLists: BudgetType[] }) {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);

  const calculateCardInfo = useCallback(() => {
    let totalBudget_ = 0;
    let totalSpend_ = 0;

    budgetLists.forEach((budget: BudgetType) => {
      totalBudget_ = totalBudget_ + Number(budget?.amount);
      totalSpend_ = totalSpend_ + Number(budget?.totalSpend);
    });

    setTotalBudget(totalBudget_);
    setTotalSpend(totalSpend_);
  }, [budgetLists]);

  useEffect(() => {
    if (budgetLists.length > 0) {
      calculateCardInfo();
    }
  }, [budgetLists, calculateCardInfo]);

  return (
    <div>
      {budgetLists?.length > 0 ? (
        <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
          <div className='p-7 border rounded-lg flex items-center justify-between'>
            <div>
              <h2 className='text-sm'>Total Budget</h2>
              <h2 className='text-2xl font-bold'>${totalBudget.toFixed(2)}</h2>
            </div>
            <Banknote className='bg-primary p-3 h-12 w-12 rounded-full text-white' />
          </div>
          <div className='p-7 border rounded-lg flex items-center justify-between'>
            <div>
              <h2 className='text-sm'>Total Spend</h2>
              <h2 className='text-2xl font-bold'>${totalSpend.toFixed(2)}</h2>
            </div>
            <Receipt className='bg-primary p-3 h-12 w-12 rounded-full text-white' />
          </div>
          <div className='p-7 border rounded-lg flex items-center justify-between'>
            <div>
              <h2 className='text-sm'>No. of Total Budget</h2>
              <h2 className='text-2xl font-bold'>{budgetLists?.length}</h2>
            </div>
            <Wallet className='bg-primary p-3 h-12 w-12 rounded-full text-white' />
          </div>
        </div>
      ) : (
        [1, 2, 3].map((item, idx) => (
          <div
            key={idx}
            className='w-full bg-slate-200 rounded-lg h-[120px] animate-pulse'
          ></div>
        ))
      )}
    </div>
  );
}

export default CardInfo;
