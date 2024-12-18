'use client';

import { ShootingStars } from '@/components/ui/shooting-stars';
import { StarsBackground } from '@/components/ui/stars-background';
import Link from 'next/link';
export function ShootingStarsAndStarsBackgroundDemo() {
  return (
    <div className='h-[40rem] rounded-md bg-neutral-900 flex flex-col items-center justify-center relative w-full'>
      <h2 className='relative flex-col z-10 text-3xl md:text-5xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8'>
        <span className='mb-4'>404 - Page Not Found</span>
        <span className='mb-4'>
          This page you are looking for does not exist.
        </span>
        <Link href={'/'}>Go Home.</Link>
      </h2>
      <ShootingStars />
      <StarsBackground />
    </div>
  );
}
