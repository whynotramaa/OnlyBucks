import { getSocialIcon, SocialPlatform } from '@/lib/socialToIcon'
import { urlFor } from '@/sanity/lib/image'
import { getSiteSettings } from '@/sanity/lib/siteSettings/getSiteSettings'
import Image from 'next/image'
import React from 'react'
import MemebrBtn from './MemebrBtn'
import { getPosts } from '@/sanity/lib/posts/getPosts'

async function InfoPannel() {
    const siteSettings = await getSiteSettings()
    const posts = await getPosts();
    return (
        <div className='flex flex-col items-center justify-center max-w-2xl mx-auto py-8 px-4 space-y-4'>
            {/* logo */}
            {siteSettings?.logo && (
                <Image
                    src={urlFor(siteSettings?.logo).url()}
                    alt='logo'
                    width={172}
                    height={172}
                    className='rounded-lg z-50'
                />
            )}

            {/* title */}
            <h1 className='text-4xl font-bold text-center mt-4'>
                {siteSettings?.title}
            </h1>

            {/* description */}
            <p className='text-sm text-gray-600 text-center'>
                {siteSettings?.description}

            </p>

            {/* posts */}
            <div className="flex items-center justify-center space-x-4">
                <div className="text-center">
                    <p className='text-2xl font-bold'>
                        {posts.length}
                    </p>
                    <p className='text-gray-600'>
                        posts
                    </p>
                </div>

            </div>

            {/* member button */}
            <MemebrBtn />


            {/* socials */}

            <div className="flex items-center text-neutral-600 justify-center space-x-4">
                {siteSettings?.socialMediaLinks?.map((social)=>{
                    const Icon = getSocialIcon(social.platform as SocialPlatform)
                    return(
                        <a href={social.url} key={social.platform}>
                            {/* <div className='flex items-center bg-amber-600 gap-2'> */}
                            <Icon />
                            {/* </div> */}
                        </a>
                    )
                })}

            </div>

        </div>
    )
}

export default InfoPannel