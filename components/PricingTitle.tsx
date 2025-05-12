'use client'

import useMembershipTier from "@/hooks/useMembershipTier";
import { Heart } from "lucide-react";

function PricingTitle() {
    const membershipTier = useMembershipTier()
    const isPremium = membershipTier && membershipTier > 1;

  return (
    <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl flex items-center justify-center gap-4">
            {isPremium? "Thank You for supporting my work !" : "Show some support"}
                <Heart className="w-8 h08 fill-red-500 text-red-500" />
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {isPremium
            ? "Manage your membership below."
            :"Support our work and unlock exclusive benefits of the community and get secret access to exclusive never-seen-before content"}

        </p>
    </div>
  )
}

export default PricingTitle