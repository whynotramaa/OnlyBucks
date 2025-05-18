'use client'

import useMembershipTier from '@/hooks/useMembershipTier'
import { GetPostQueryResult } from '@/sanity.types'
import { tierMap } from '@/types/types';
import { useUser } from '@clerk/nextjs';
import React, { useState, useTransition } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Loader2, Send } from 'lucide-react';
import toast, { } from 'react-hot-toast'
import addComment from '@/actions/addComment';
import TimeAgo from 'react-timeago';

function Comments({ post }: { post: GetPostQueryResult }) {
    const [comment, setComment] = useState("")
    const [isCommenting, startTransition] = useTransition();
    const { user } = useUser()
    const membershipTier = useMembershipTier();

    const hasEngagementFeature = membershipTier && membershipTier >= tierMap.Insiders

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!post || !membershipTier) return;

        const id = post._id;
        const text = comment;

        // Clear the textarea immediately

        startTransition(async () => {
            try {
                await addComment(id, text);
                setComment("");
                toast.success("Comment added successfully!")

            } catch (error) {
                console.error(error);
                // Restore comment if there was an error
                setComment(text);
                toast.error("Wait there is some error.")
            }
        });
    };

    return (
        <div className='space-y-6'>
            {/* comment input box */}
            <form onSubmit={handleSubmit} className='mt-6'>
                <div className="flex items-start gap-4 bg-white rounded-lg p-2 md:p-6">
                    <Avatar className="h-10 w-10 rounded-full ring-2 ring-blue-500 shadow-sm">
                        <AvatarImage src={'/default-avatar.png'} alt="Your avatar" />
                        <AvatarFallback className="text-sm font-medium text-white bg-blue-500">
                            {user?.firstName?.charAt(0)}
                            {user?.lastName?.charAt(0)}
                        </AvatarFallback>
                    </Avatar>


                    <div className="flex-1">
                        <Textarea
                            disabled={!user || !hasEngagementFeature || isCommenting}
                            placeholder={
                                isCommenting ? "Adding Comment..." : hasEngagementFeature
                                    ? "Write a comment"
                                    : "Upgrade membership to comment"
                            }
                            value={comment}
                            onKeyDown={(e) => {
                                if (
                                    e.key === "Enter" &&
                                    !e.shiftKey &&
                                    !e.ctrlKey &&
                                    !e.altKey &&
                                    !e.metaKey
                                ) {
                                    handleSubmit(
                                        e as unknown as React.FormEvent<HTMLFormElement>

                                    );
                                }
                            }}

                            onChange={(e) => setComment(e.target.value)}
                            className='w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]'
                        />

                        <div className="flex justify-end mt-2">
                            <Button
                                type='submit'
                                disabled={!user || !hasEngagementFeature || isCommenting}
                                className='ml-auto'
                            >
                                {isCommenting ? (
                                    <Loader2 className='h-5 w-5 animate-spin' />
                                ) : (
                                    <Send className='h-5 w-5' />
                                )}
                                Comment
                            </Button>
                        </div>

                    </div>

                </div>
            </form>

            {/* comments */}
            <div className="space-y-4">

                {post?.comments.length === 0 && (
                    <p className='text-center text-gray-500 py-4'>
                        No comments added. Be the <span className='font-bold capitalize'>first one</span> to share your thoughts! 🤗
                    </p>
                )}


                {post?.comments.map((comment) => (
                    <div
                        key={comment._id}
                        className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200"
                    >
                        <Avatar className="h-9 w-9">
                            <AvatarImage
                                src={comment.userImage || "/default-avatar.png"}
                                alt={`${comment.name}'s avatar`}
                            />
                            <AvatarFallback className="bg-gray-100 text-gray-600 text-sm font-medium">
                                {comment.name?.charAt(0).toUpperCase()}
                                {comment.name?.charAt(1)?.toUpperCase() || ""}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h4 className="text-sm font-medium text-gray-900">{comment.name}</h4>
                                {comment._createdAt && (
                                    <span className="text-xs text-gray-400">
                                        <TimeAgo date={comment._createdAt} />
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-gray-700">{comment.comment}</p>
                        </div>
                    </div>

                ))}

            </div>


        </div>
    )
}

export default Comments