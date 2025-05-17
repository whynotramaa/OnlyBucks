'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { membershipMap, tierMap } from "@/types/types";

import { useRouter } from "next/navigation"

function FilterTierBySelect() {
    const router = useRouter();

    const handleValueChange = (value: string) => {
        if(value == "all"){
            router.push('/')
        } else{

            router.push(`/?tier=${value}`)
        }
    }

  return (
  <Select onValueChange={handleValueChange}>
    <SelectTrigger className="w-[200px]">
      <SelectValue placeholder="Filter posts by tier" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="all">All</SelectItem>
      {Object.entries(tierMap).map(([tier, level]) => (
        <SelectItem key={tier} value={tier}>
          {membershipMap[level]}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);
}

export default FilterTierBySelect