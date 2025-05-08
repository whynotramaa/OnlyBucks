import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { HeartIcon } from 'lucide-react'

function Header() {
  return (
    <header className='flex justify-between p-4 border-b border-1 mb-2'>
      {/* left side */}
      <Link href="/">
        <h2 className='text-lg font-bold uppercase  '>Creator Page</h2>
      </Link>

      {/* right side */}
      <div>
        <SignedIn>
          <UserButton />
        </SignedIn>

        <SignedOut>
          <Button asChild variant="outline" className='cursor-pointer px-4 py-2 bg-red-500 text-white rounded-lg'>
            <div>
            <SignInButton mode='modal' />
            <HeartIcon className='w-4 h-4' />
            </div>
          </Button>
        </SignedOut>
      </div>

    </header>
  )
}

export default Header