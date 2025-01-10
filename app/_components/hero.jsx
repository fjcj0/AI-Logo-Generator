"use client";
import React, { useState } from 'react'
import lookup from '../_data/lookup'
import { Button } from '@/components/ui/button'
import Link from 'next/link';
function Hero() {
  const [logoTitle, setLogoTitle] = useState();
  return (
    <div className='flex items-center mt-24 flex-col gap-5'>
          <h2 className=' text-primary text-5xl text-center font-bold'>{lookup.HeroHeading}</h2>
          <h2 className='text-5xl text-center font-bold'>{lookup.HeroSubHeading}</h2>
          <p className='text-lg text-gray-500 text-center'>{lookup.HeroDesc}</p>
          <div className='flex gap-6 w-full max-w-2xl mt-10'>
        <input type="text" placeholder={lookup.InputTitlePlaceHolder} className='p-3 border rounded-md w-full shadow-md'
          onChange={(event) => setLogoTitle(event?.target.value)} />
        <Link href={'/create?title='+logoTitle}>
          <Button className='w-full p-6'>Get Started</Button>
          </Link>
          </div>
    </div>
  )
}

export default Hero
