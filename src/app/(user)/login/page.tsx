'use client'

import { FormEvent, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/hooks/useAuth';

export default function Login() {
  const router = useRouter();
  
  const { signIn } = useAuth();
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const handleCreateUserSession = useCallback(async (event: FormEvent) => {
    event.preventDefault()
    
    if (!email || !password) {
      return;
    }
    
    const response = await signIn({
      email,
      password
    });
    
    if (!response.success) {
      alert('Houve um erro desconhecido!')
      
      return;
    }
    
    router.push('/')
  }, [email, password, signIn, router])
    
  return (
    <main className='h-screen w-full flex flex-col gap-2 items-center justify-center'>
      <form 
        className='flex flex-col gap-4'
        onSubmit={handleCreateUserSession}
      >
        <h1 className='text-3xl font-bold text-blue-400'>Login user</h1>
        
        <fieldset className='flex flex-col gap-2'>
          <label className='text-blue-200'>E-mail</label>
          
          <input 
            className='rounded-md bg-blue-950'
            type="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </fieldset>
        
        <fieldset className='flex flex-col gap-2'>
          <label className='text-blue-200'>Password</label>
          
          <input 
            className='rounded-md bg-blue-950'
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </fieldset>
        
        <button className='py-2 rounded-md bg-blue-800' type="submit">
          Sign in
        </button>
      </form>
    </main>
  )
}
