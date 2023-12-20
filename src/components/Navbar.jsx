'use client'

import { useUser } from '@auth0/nextjs-auth0/client';

export default function Navbar() {

  const { user, isLoading } = useUser();

  return (
    <>
      {user && (
        <header className='flex flex-row justify-between gap-3 max-w-4xl mx-auto mt-4'>
          <div className='my-5 flex flex-row gap-1'>
            <img width="33" height="33" src="https://img.icons8.com/color/72/goodnotes.png" alt="goodnotes"/>
            <h1 className='text-2xl font-bold'>Post-That Thought</h1>
          </div>
          <div className='my-5 flex flex-row gap-1'>
            <a href="/api/auth/logout">Logout</a>
          </div>
        </header>
      )}
      {!user && !isLoading && (
        <>
        </>
      )}
    </>
  )
}
