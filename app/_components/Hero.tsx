'use client';

import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function Hero() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) router.replace('/dashboard');
  }, [isSignedIn, router]);

  return (
    <section className='bg-gray-50 flex items-center flex-col'>
      <div className='flex flex-col overflow-hidden'>
        <ContainerScroll
          titleComponent={
            <div className='mx-auto max-w-xl text-center'>
              <h1 className='text-2xl font-extrabold sm:text-4xl'>
                Manage Your Expense <br />
                <strong className='font-extrabold text-primary sm:block'>
                  Control Your Money
                </strong>
              </h1>
              <p className='mt-4 sm:text-xl/relaxed'>
                Start creating your money and save ton of money!
              </p>
              <div className='mt-4 mb-8 flex flex-wrap justify-center gap-4'>
                <Link
                  className='block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-green-700 focus:outline-none focus:ring active:bg-green-500 sm:w-auto cursor-pointer'
                  href={'/sign-in'}
                >
                  Get Started
                </Link>
              </div>
            </div>
          }
        >
          <Image
            src={`/dashboard.png`}
            alt='hero'
            height={720}
            width={1400}
            className='mx-auto rounded-2xl object-cover h-full object-left-top'
            draggable={false}
          />
        </ContainerScroll>
      </div>
    </section>
  );
}

export default Hero;
