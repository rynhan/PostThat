// 'use client'
// export default function Home() {
//   return (
//     <p>This is the Main page.</p>
//   )
// }

'use client'

import { useRouter } from 'next/navigation'
import { withPageAuthRequired, useUser } from '@auth0/nextjs-auth0/client';

export default function CSRPage() {

    const { user, isLoading } = useUser()
    const router = useRouter()

    return (
        <>
        {user && (
            router.push("/crud-memo/")
        )}
        {!user && !isLoading && (

            <>
            <div className='max-w-4xl flex flex-row justify-center mx-auto mt-36 gap-3'>
                <div className='my-5 flex flex-col gap-0'>
                    <img width="72" height="72" src="https://img.icons8.com/color/72/goodnotes.png" alt="goodnotes"/>
                </div>
                <div className='my-5 flex flex-col gap-0'>
                    <h1 className='text-3xl font-bold'>Post-That Thought</h1>
                    <p className="text-xl">Where great thoughts captured</p>
                </div>
            </div>
            <div className='max-w-4xl flex flex-row justify-center mx-auto mt-4 gap-3'>
                
                <a href="/api/auth/login" className="bg-blue-700 text-white p-3 cursor-pointer rounded-xl">Login</a>
            </div>
            
            </>
        )}
        </>
    )
}