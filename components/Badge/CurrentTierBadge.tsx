'use client'

import useMembershipTier from "@/hooks/useMembershipTier"
import { getTierFromLevel } from "@/types/types"
import { useUser } from "@clerk/nextjs"
import Badge from "./Badge"

function CurrentTierBadge() {
    const membership = useMembershipTier()
    const {user} = useUser()

    if(!user || !membership) return null 

    const tierAccess = getTierFromLevel(membership)

  return <Badge variant="interactive" tierAccess={tierAccess} link="/pricing" />
}

export default CurrentTierBadge