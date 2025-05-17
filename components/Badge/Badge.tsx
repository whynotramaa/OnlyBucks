import { membershipMap, TierAccess, tierMap } from '@/types/types';
import React from 'react'
import { getBadgeColor, getBadgeIcon } from './utils';
import Link from 'next/link';

interface BadgeProps{
    variant: "interactive"|"simple";
    tierAccess: TierAccess;
    className?:string;
    link?:string
}

function Badge( {variant = "simple", tierAccess,className, link} : BadgeProps ) {

    const baseStyles = "px-3 py-1 rounded-full text-sm font-medium"
    const level = tierMap[tierAccess];
    const label = membershipMap[level];
    const badgeColor = getBadgeColor(level);

    if (variant === "interactive"){
      return(
        <Link
        href={link || ""}
        className={`
          flex items-center gap-2 ${baseStyles} ${badgeColor} shadow-sm transition-all duration-200 px-2
          hover:shadow-md hover:scale-105
          ${className}
          `}
        >
          {getBadgeIcon(level)}
          <p>{label}</p>
        </Link>
      )
    }

  return (
    <p className={
      `
      ${baseStyles}
      ${badgeColor}
      ${className}
      `
    }>
      
      {label}
    </p>
  )
}

export default Badge