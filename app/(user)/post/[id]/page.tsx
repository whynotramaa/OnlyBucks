import Badge from '@/components/Badge/Badge';
import Comments from '@/components/Comments';
import CreatedAt from '@/components/CreatedAt';
import { urlFor } from '@/sanity/lib/image';
import { getPost } from '@/sanity/lib/posts/getPost';
import { ArrowLeftIcon } from 'lucide-react';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'

async function PostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const post = await getPost(id);
    if (!post) return notFound();

    return (
        <main className='min-h-screen bg-white'>
            {post.coverImage?.asset && (
                <div className="relative h-[50vh] w-full ">
                    {/* blurred */}
                    {/* <div className="absolute inset-0 overflow-hidden">
                        <Image
                            src={urlFor(post.coverImage).url()}
                            alt={post.coverImage.alt || post.title || "Cover Image of the post"}
                            fill
                            className='object-cover blur-md scale-105 brightness-90'
                            priority
                        />
                    </div> */}

                    {/* clear center image */}
                    <div className="absolute inset-0 flex items-center justify-center ">
                        <div className="relative w-full max-w-3xl h-full max-h-[400px] mx-4 hover:scale-105 hover:shadow-4xl transition-all duration-200">
                            <Image
                                src={urlFor(post.coverImage).url()}
                                alt={post.coverImage.alt || post.title || "Cover Image"}
                                fill
                                className='object-cover rounded-lg shadow-lg'
                                priority
                            />
                        </div>
                    </div>
                </div>
            )}

            <div className='max-w-3xl mx-auto px-4 py-12 border-t-2'>
                <Link href="/" className='text-sm text-gray-500 flex items-center gap-2 mb-6'>
                    <ArrowLeftIcon className='w-4 h-4' />
                    Return to posts
                </Link>

                {post.tierAccess && (
                    <>
                        {/* TOP SECTION with border and justify-between */}
                        <div className="relative mb-6 p-4 flex items-center justify-between bg-gray-100 rounded-lg  border-gray-300">
                            <Badge variant='simple' tierAccess={post.tierAccess} />
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <p className='font-medium'>Posted:</p>
                                <CreatedAt date={post._createdAt} />
                            </div>
                        </div>

                        {/* BLOG SECTION below with spacing */}
                        <div className="space-y-8">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                                {post.title}
                            </h1>
                            {post.body && (
                                <div className="prose prose-lg max-w-none prose-headings:font-semibold prose-a:text-blue-500">
                                    <PortableText value={post.body} />
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>

            <hr />

            <div className='max-w-3xl mx-auto px-4 py-12'>
                {/* COMMENTS */}
                <Comments post={post} />

            </div>

        </main>
    )
}

export default PostPage