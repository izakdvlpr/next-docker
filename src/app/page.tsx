import Link from 'next/link'

export default function Home() {
  return (
    <main className='h-screen w-full flex flex-col gap-2 items-center justify-center'>
      <h1 className='text-3xl font-bold text-blue-400'>You are in the environment of {process.env.NODE_ENV}!</h1>
      
      <kbd className='text-xl text-blue-400'>
        This is the url of my api: <a href={process.env.NEXT_PUBLIC_MY_API} className='underline' target='_blank' rel="noopener noreferrer">{process.env.NEXT_PUBLIC_MY_API}</a>
      </kbd>
      
      <Link href="/profile" className='hover:text-orange-400 hover:underline'>Go to profile</Link>
      <Link href="/settings" className='hover:text-purple-400 hover:underline'>Go to settings</Link>
    </main>
  )
}
