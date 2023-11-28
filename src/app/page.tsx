'use client'

import Link from 'next/link'

import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const { user } = useAuth();
  
  return (
    <main className='h-screen w-full flex flex-col gap-2 items-center justify-center'>
      {user && <Link href="/profile" className='text-red-400 hover:underline'>Go to profile</Link>}
      
      <Link href="/login" className='text-orange-400 hover:underline'>Go to Login</Link>
      
      <Link href="/register" className='text-purple-400 hover:underline'>Go to Register</Link>
    </main>
  )
}
