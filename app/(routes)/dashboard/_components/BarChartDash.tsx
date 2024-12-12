'use client';

import { BudgetType } from '@/types';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

function BarChartDash({ budgetLists }: { budgetLists: BudgetType[] }) {
  return (
    <div className='border rounded-lg p-5'>
      <h2 className='text-xl font-bold my-3'>Activity</h2>
      <ResponsiveContainer width={'80%'} height={300}>
        <BarChart
          data={budgetLists}
          margin={{
            top: 5,
            left: 5,
            right: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='totalSpend' stackId={'a'} fill='#088970' />
          <Bar dataKey='amount' stackId={'a'} fill='#82ca9d' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartDash;
