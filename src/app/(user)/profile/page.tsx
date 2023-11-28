'use client'

import Link from 'next/link';

export default function Profile() {
  return (
    <main className='h-screen w-full flex flex-col gap-2 items-center justify-center'>
      <h1 className='text-3xl font-bold text-orange-400'>This is my profile</h1>
      
      <Link href="/" className='hover:text-blue-400 hover:underline'>Back to home</Link>
    </main>
  )
}
