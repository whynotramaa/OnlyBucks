import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { HeartIcon } from 'lucide-react'
import { getSiteSettings } from '@/sanity/lib/siteSettings/getSiteSettings'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import CurrentTierBadge from './Badge/CurrentTierBadge'

async function Header() {

  const siteSettings = await getSiteSettings();

  // console.log(siteSettings)

  return (
    <header className='flex justify-between p-4 border-b border-1 mb-2'>
      {/* left side */}
      <Link href="/">
        {siteSettings?.headerLogo ? (
            <Image src={urlFor(siteSettings?.headerLogo).url()} 
            alt={siteSettings.headerLogo.alt || "Logo"}
            height={40}
            width={40}

            />
        ) : (
        <h2>{siteSettings?.title} </h2>
        )}
      </Link>

      {/* right side */}
      <div>
        
        <SignedIn>
          <div className='flex items-center gap-2 hover:gap-4 p-2 hover:px-4 hover:bg-gray-100 transition-all duration-200 border border-gray-200 rounded-full'>
        {/* Current Tier Badge */}
        <CurrentTierBadge />
        
          <UserButton />
          </div>
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