import { Metadata } from 'next';
import BudgetInfo from './_components/BudgetInfo';

export const metadata: Metadata = {
  title: 'Expenses - My Expense Tracker',
  description: 'Generated by create next app',
};

function Expenses() {
  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold'>My Expenses</h2>
      <BudgetInfo />
    </div>
  );
}

export default Expenses;