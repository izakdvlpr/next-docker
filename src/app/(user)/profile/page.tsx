'use client'

import { useRouter } from 'next/navigation';

import { useAuth } from '@/hooks/useAuth';

export default function Profile() {
  const { user, logOut } = useAuth();
  
  const router = useRouter();
  
  return (
    <main className='h-screen w-full flex flex-col gap-2 items-center justify-center'>
      {
        user ? 
          <>
            <h1 className='text-3xl font-bold text-blue-400'>Hi, {user.name}!</h1> 
            
            <button 
              className='py-2 px-4 rounded-md bg-red-400'
              onClick={() => {
                router.replace('/login');

                logOut();
              }}
            >
              Log out
            </button>
          </>
        : <p>Loading...</p>
      }
    </main>
  )
}
