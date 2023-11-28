'use client'

import Link from 'next/link';

export default function Settings() {
  return (
    <main className='h-screen w-full flex flex-col gap-2 items-center justify-center'>
      <p className='text-3xl font-bold text-purple-400'>These are my settings</p>
      
      <Link href="/" className='hover:text-blue-400 hover:underline'>Back to home</Link>
    </main>
  )
}
