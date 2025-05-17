import { GetPostsQueryResult } from '@/sanity.types'
import { urlFor } from '@/sanity/lib/image'
import { Lock, MessageCircleIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import TierBadge from './TierBadge'
import CreatedAt from './CreatedAt'
// import { TierAccess } from "@"; // Adjust the path if necessary

function LockedPost({ post }: { post: GetPostsQueryResult[number] }) {

    return (
        <div>
            <Link href="/pricing">
                <article className='bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-150 p-4 group cursor-pointer relative border-1'>
                    {post.coverImage?.asset && (
                        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                            <div className="absolute inset-0 z-10 flex items-center justify-center">
                                <Lock className="w-12 h-12 text-white" />
                            </div>
                            <Image
                                src={urlFor(post.coverImage).url()}
                                alt={post.coverImage.alt || post.title || "Post cover image"}
                                fill
                                className="object-cover blur-sm"
                            />
                        </div>
                    )}


                    {post.tierAccess && (
                        <div className="absolute top-4 p-4 sm:hidden right-4 z-20">
                            <TierBadge tierAccess={post.tierAccess} />
                        </div>
                    )}

                    <div className="p-6 space-y-3">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {post.title}
                        </h2>

                        <div className=" text-gray-700 prose prose-sm opacity-80 relative z-20">
                            {post.body && (
                                <div className="blur-[3px] overflow-hidden max-h-32">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolore quisquam, nihil fuga aliquam rem in fugiat vitae sapiente illo repudiandae provident consectetur vero delectus aspernatur adipisci accusantium commodi maiores.
                                </div>
                            )}

                            <div className="absolute inset-0 flex items-center -top-12 justify-center z-30">
                                <div className="bg-purple-600 text-white px-6 py-2 rounded-full font-medium hover:bg-purple-700 transition-colors duration-200 flex items-center space-x-2 shadow-lg gap-2">
                                    <Lock className="w-4 h-4" />
                                    Unlock Premium Content
                                </div>
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
                    </div>
                </article>
            </Link>
        </div>
    )
}

export default LockedPost