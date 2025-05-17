'use client'

import useMembershipTier from '@/hooks/useMembershipTier'
import { GetPostsQueryResult } from '@/sanity.types'
import { TierAccess, tierMap } from '@/types/types'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import LockedPost from './LockedPost'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import Badge from './Badge/Badge'
import { PortableText } from '@portabletext/react'
import { ArrowLeftCircleIcon, ArrowRightCircleIcon, MessageCircleIcon } from 'lucide-react'
import CreatedAt from './CreatedAt'



function Post({ post }: { post: GetPostsQueryResult[number] }) {
    const membershipTier = useMembershipTier()
    const { user } = useUser()

    const postMembershipLevel = tierMap[post.tierAccess as TierAccess]
    const isLocked = membershipTier && membershipTier < postMembershipLevel;

    if (!membershipTier) {
        return (
            <div className="bg-white rounded-lg shadow-sm relative animate-pulse">
                {post.coverImage && (
                    <div className="relative aspect-video-[16/9] w-full overflow-hidden rounded-t-lg bg-gray-200" />
                )}

                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="h-4 bg-gray-200 rounded w-1/4" />
                    </div>

                    {!user && (
                        <div className="space-y-2 text-center my-8">
                            <p className="text-gray-500">Sign in to view this post.</p>
                        </div>
                    )}

                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-full" />
                        <div className="h-4 bg-gray-200 rounded w-5/6" />
                        <div className="h-4 bg-gray-200 rounded w-4/6" />
                    </div>
                </div>
            </div>
        );
    }

    if (isLocked) return <LockedPost post={post} />

    return (
        <div>
            <Link href={`/post/${post._id}`}>
                <article className='bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 group cursor-pointer relative'>
                    {post.coverImage?.asset && (
                        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                            <Image src={urlFor(post.coverImage).url()}
                                alt={post.coverImage.alt || post.title || "Cover image fro the post"}
                                fill
                                className='object-cover group-hover:scale-105 transition-all duration-300'
                            />
                        </div>
                    )}
                    {post.tierAccess && (
                        <div className="absolute top-4 p-4 right-4 z-20">
                            <Badge variant='simple' tierAccess={post.tierAccess} />
                        </div>
                    )}

                    <div className="p-6">
                        <h2 className='text-xl font-semibold text-gray-900 mb-4 border-b'>
                            {post.title}
                        </h2>
                        <div className="relative">
                            <div className="text-gray-600 prose line-clamp-6">
                                <PortableText value={post.body || []} />
                            </div>

                            {/* Fade at the bottom for nice UX */}
                            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
                        </div>
                            <div className='z-500 flex items-center justify-center border-2 rounded-4xl text-sm flex-1 mx-auto w-fit py-2 px-4 text-gray-500 hover:scale-105 transition-all duration-200'>
                                <h3 className='flex gap-2 items-center'>Read more <ArrowRightCircleIcon/> </h3>
                            </div>

                        <div className="flex items-center justify-between mt-6">
                            <div className="text-sm text-gray-500 text-right border border-gray-200 rounded-full px-4 py-1 flex items-center gap-2">
                                <MessageCircleIcon className="w-4 h-4" />
                                {post.comments?.length} comments
                            </div>
                            <div className="text-sm text-gray-500 text-right">
                                <CreatedAt date={post._createdAt} />
                            </div>
                        </div>
                    </div>

                </article>
            </Link>
        </div>
    )
}

export default Post