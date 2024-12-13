'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import DashboardHeader from './_components/DashboardHeader';
import SideNav from './_components/SideNav';

function Dashboardlayout({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const router = useRouter();

  // Wrap the function in useCallback
  const checkUserBudgets = useCallback(async () => {
    const response = await fetch('/api/check-budgets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user?.primaryEmailAddress?.emailAddress,
      }),
    });

    const result = await response.json();

    if (result.length === 0) {
      router.replace('/dashboard/budgets');
    }
  }, [router, user?.primaryEmailAddress?.emailAddress]); // Include dependencies

  useEffect(() => {
    if (user) checkUserBudgets();
  }, [user, checkUserBudgets]); // Dependencies include the user and the callback

  return (
    <div>
      <div className='fixed md:w-64 hidden md:block'>
        <SideNav />
      </div>
      <div className='md:ml-64'>
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}

export default Dashboardlayout;
