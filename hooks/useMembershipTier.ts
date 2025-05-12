'use client'

import { MembershipLevel } from "@/types/types"
import { useSchematicFlag } from "@schematichq/schematic-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface PlanChangeDetail {
  planId?: string;
  tier?: string;
  status?: string;
  // Add other properties based on what the checkout/unsubscribe response
  // contains
}

// Define the custom event type
interface PlanChangedEvent extends CustomEvent {
  detail: PlanChangeDetail;
}

function useMembershipTier(): MembershipLevel | null{
    const router = useRouter()

    const hasNormiesContent = useSchematicFlag("backstage-pass")
    const hasInsidersContent = useSchematicFlag("insider-content")
    const hasHomiesContent = useSchematicFlag("homies-things")

   useEffect(() => {
  // Listen for plan-changed events
  const handlePlanChanged = (event: PlanChangedEvent) => {
    // Handle the plan change event
    console.log("Plan changed:", event.detail);

    // You can update UI, refresh data, or trigger other actions here
    // For example, you might want to refetch user entitlements
    router.refresh();
  };

  window.addEventListener("plan-changed", handlePlanChanged as EventListener);

  // Clean up the event listener when component unmounts
  return () => {
    window.removeEventListener(
      "plan-changed",
      handlePlanChanged as EventListener
    );
  };
}, [router]);

    if(hasHomiesContent) return 3;
    if(hasInsidersContent) return 2;
    if(hasNormiesContent) return 1;

    return null
}

export default useMembershipTier