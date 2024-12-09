import { BudgetType } from '@/types';

function BudgetItem({ budget }: { budget: BudgetType }) {
  return (
    <div className='p-5 border rounded-lg hover:shadow-md cursor-pointer'>
      <div className='flex gap-2 justify-between'>
        <div className='flex gap-2 items-center'>
          <h2 className='text-2xl p-3 px-4 bg-slate-100 rounded-full'>
            {budget?.icon}
          </h2>
          <div>
            <h2 className='text-md font-bold'>{budget?.name}</h2>
            <h2 className='text-sm text-slate-600'>{budget?.totalItem} item</h2>
          </div>
        </div>
        <h2 className='font-bold text-primary text-lg'>${budget?.amount}</h2>
      </div>

      <div className='mt-5'>
        <div className='flex items-center justify-between mb-2'>
          <h2 className='text-xs text-slate-400'>
            ${budget?.totalSpend ? budget?.totalSpend : 0} spent
          </h2>
          <h2 className='text-xs text-slate-400'>
            ${budget?.amount - budget?.totalSpend} remains
          </h2>
        </div>
        <div className='w-full bg-slate-300 h-2 rounded-full'>
          <div className='w-[40%] bg-primary h-2 rounded-full'></div>
        </div>
      </div>
    </div>
  );
}

export default BudgetItem;