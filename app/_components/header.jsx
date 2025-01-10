"use client";
import { Button } from '@/components/ui/button';
import { UserButton, useUser, SignInButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
function Header() {
  const { user } = useUser();
  return (
    <div className='px-10 lg:px-32 xl:px-48 2xl:px-56 p-4 flex justify-between items-center shadow-sm'>
      <Image src={'/logo.svg'} alt='logo' width={180} height={100} />
      <div className='flex'>
        {user ? (
          <Link href={'/dashboard'}>
            <Button variant='outline' className="mx-2">Dashboard</Button>
          </Link>
        ) : (
          <div className='flex items-center'>
            <Link href={'/'}>
              <Button className="mx-2">Home</Button>
            </Link>
            <SignInButton mode='modal' forceRedirectUrl='/create'>
              <Button variant='outline'>Sign In</Button>
            </SignInButton>
          </div>
        )}
        <UserButton />
      </div>
    </div>
  );
}
export default Header;