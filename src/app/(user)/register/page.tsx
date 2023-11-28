'use client'

import { FormEvent, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import { api } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';

export default function Register() {
  const router = useRouter();
  
  const { signIn } = useAuth();
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const handleCreateUser = useCallback(async (event: FormEvent) => {
    event.preventDefault()
    
    if (!name || !email || !password) {
      return;
    }
    
    
    await api.post(
      'users',
      {
        name,
        email,
        password,
      },
    );
    
    await signIn({
      email,
      password
    });
    
    router.push('/')
  }, [name, email, password, signIn, router])
    
  return (
    <main className='h-screen w-full flex flex-col gap-2 items-center justify-center'>
      <form 
        className='flex flex-col gap-4'
        onSubmit={handleCreateUser}
      >
        <h1 className='text-3xl font-bold text-blue-400'>Register user</h1>
        
        <fieldset className='flex flex-col gap-2'>
          <label className='text-blue-200'>Name</label>
          
          <input 
            className='rounded-md bg-blue-950'
            type="text"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </fieldset>
        
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
          Create
        </button>
      </form>
    </main>
  )
}
