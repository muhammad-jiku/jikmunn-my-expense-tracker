'use client';

import { BudgetType, IncomeType } from '@/types';
import { formatNumber } from '@/utils';
import { CircleDollarSign, HandCoins, Vault, Wallet } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

function CardInfo({
  budgetLists,
  incomeLists,
}: {
  budgetLists: BudgetType[];
  incomeLists: IncomeType[];
}) {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);
  // const [financialAdvice, setFinancialAdvice] = useState(0);

  const calculateCardInfo = useCallback(() => {
    let totalBudget_ = 0;
    let totalIncome_ = 0;
    let totalSpend_ = 0;

    budgetLists.forEach((budget: BudgetType) => {
      totalBudget_ = totalBudget_ + Number(budget?.amount);
      totalSpend_ = totalSpend_ + Number(budget?.totalSpend);
    });

    incomeLists.forEach((income: IncomeType) => {
      totalIncome_ = totalIncome_ + Number(income?.totalAmount);
    });

    setTotalBudget(totalBudget_);
    setTotalIncome(totalIncome_);
    setTotalSpend(totalSpend_);
  }, [budgetLists, incomeLists]);

  useEffect(() => {
    if (budgetLists.length > 0 || incomeLists.length > 0) {
      calculateCardInfo();
    }
  }, [budgetLists, incomeLists, calculateCardInfo]);

  return (
    <div>
      {budgetLists?.length > 0 ? (
        <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
          <div className='p-7 border rounded-lg flex items-center justify-between'>
            <div>
              <h2 className='text-sm'>Total Budget</h2>
              <h2 className='text-2xl font-bold'>
                ${formatNumber(Number(totalBudget.toFixed(2)))}
              </h2>
            </div>
            <Vault className='bg-primary p-3 h-12 w-12 rounded-full text-white' />
          </div>
          <div className='p-7 border rounded-lg flex items-center justify-between'>
            <div>
              <h2 className='text-sm'>Total Spend</h2>
              <h2 className='text-2xl font-bold'>
                ${formatNumber(Number(totalSpend.toFixed(2)))}
              </h2>
            </div>
            <HandCoins className='bg-primary p-3 h-12 w-12 rounded-full text-white' />
          </div>
          <div className='p-7 border rounded-lg flex items-center justify-between'>
            <div>
              <h2 className='text-sm'>No. of Total Budget</h2>
              <h2 className='text-2xl font-bold'>{budgetLists?.length}</h2>
            </div>
            <Wallet className='bg-primary p-3 h-12 w-12 rounded-full text-white' />
          </div>
          <div className='p-7 border rounded-2xl flex items-center justify-between'>
            <div>
              <h2 className='text-sm'>Sum of Income Streams</h2>
              <h2 className='font-bold text-2xl'>
                {/* ${formatNumber(Number(totalIncome.toFixed(2)))} */}$
                {formatNumber(Number(totalIncome.toFixed(2)))}
              </h2>
            </div>
            <CircleDollarSign className='bg-primary p-3 h-12 w-12 rounded-full text-white' />
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
