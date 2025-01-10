"use client";
import { UserDetailContext } from '@/app/_context/UserDetailContext';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react'
function Info() {
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    return (
        <div>
            <div className='flex justify-between items-center'>
                <h2 className=' font-bold text-4xl text-primary'>Hello, {userDetail?.name}</h2>
                <div className='flex items-center gap-2'>
                    <Image src={'/coin.png'} alt='coin' width={40} height={40} />
                    <h2 className='font-bold text-4xl'>{userDetail?.credits} Credits Left</h2>
                </div>
            </div>
            <div className='flex justify-between items-center mt-7'>
                <h2 className='font-bold text-3xl text-primary'>Dashboard</h2>
                <Link href='/create'><Button>+ Create new logo</Button></Link>
            </div>
        </div>
    )
}
export default Info
