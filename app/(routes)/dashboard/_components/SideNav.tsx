'use client';

import { UserButton, useUser } from '@clerk/nextjs';
import {
  BadgeDollarSign,
  LayoutGrid,
  ReceiptText,
  ShieldCheck,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function SideNav() {
  const { user } = useUser();
  const path = usePathname();

  const menuLists = [
    {
      id: 1,
      name: 'Dashboard',
      icon: LayoutGrid,
      path: '/dashboard',
    },
    {
      id: 2,
      name: 'Incomes',
      icon: BadgeDollarSign,
      path: '/dashboard/incomes',
    },
    {
      id: 3,
      name: 'Budgets',
      icon: BadgeDollarSign,
      path: '/dashboard/budgets',
    },
    {
      id: 4,
      name: 'Expenses',
      icon: ReceiptText,
      path: '/dashboard/expenses',
    },
    {
      id: 5,
      name: 'Upgrade',
      icon: ShieldCheck,
      path: '/dashboard/upgrade',
    },
  ];

  return (
    <div className='h-screen p-5 border shadow-sm'>
      <div className='flex items-center justify-center'>
        <Image src={'/logo.svg'} alt='logo' width={60} height={30} />
      </div>
      <div className='mt-5'>
        {menuLists.map((menu, idx) => (
          <Link href={menu.path} key={idx}>
            <h2
              className={`flex gap-2 items-center text-gray-500 font-medium mb-2 p-5 cursor-pointer rounded-md hover:text-primary hover:bg-blue-100 ${
                path === menu.path && 'text-primary bg-blue-100'
              } `}
            >
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      <div>
        <div className='fixed bottom-10 p-3 flex gap-2 items-center'>
          <UserButton />
          {user ? user?.fullName : 'Profile'}
        </div>
      </div>
    </div>
  );
}

export default SideNav;
