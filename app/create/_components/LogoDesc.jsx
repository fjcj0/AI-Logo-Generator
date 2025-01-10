"use client";
import React from 'react'
import HeadingDescription from './HeadingDescription'
import lookup from '@/app/_data/lookup'
function LogoDesc({ onHandleInputChange, formData }) {
  return (
    <div className='my-10'>
      <HeadingDescription title={lookup?.LogoDescTitle} description={lookup.LogoDescDesc} />
      <input type="text" className='p-4 border rounded-lg mt-5 w-full' placeholder={'Enter logo description'}
        onChange={(e) => onHandleInputChange(e.target.value)} defaultValue={formData?.desc} />
    </div>
  )
}
export default LogoDesc