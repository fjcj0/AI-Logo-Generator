"use client";
import React, { useState } from 'react'
import HeadingDescription from './HeadingDescription'
import lookup from '@/app/_data/lookup'
import { useSearchParams } from 'next/navigation'
function LogoTitle({ onHandleInputChange, formData }) {
  const SearchParam = useSearchParams();
  const [title, setTitle] = useState(SearchParam?.get('title') ?? formData.title);
  return (
    <div className='my-10'>
      <HeadingDescription title={lookup?.LogoTitle} description={lookup?.LogoTitleDescription} />
      <input type="text" className='p-4 border rounded-lg mt-5 w-full' placeholder={lookup?.InputTitlePlaceHolder} defaultValue={formData?.title ? formData?.title : title}
        onChange={(e) => onHandleInputChange(e.target.value)} />
    </div>
  )
}
export default LogoTitle