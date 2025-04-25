"use client"

import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  onRatingChange?: (rating: number) => void
  readOnly?: boolean
  size?: "sm" | "md" | "lg"
}

export function StarRating({ rating, onRatingChange, readOnly = false, size = "md" }: StarRatingProps) {
  const totalStars = 5

  const handleClick = (index: number) => {
    if (readOnly || !onRatingChange) return
    onRatingChange(index + 1)
  }

  const getStarSize = () => {
    switch (size) {
      case "sm":
        return "h-4 w-4"
      case "lg":
        return "h-6 w-6"
      default:
        return "h-5 w-5"
    }
  }

  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, index) => (
        <Star
          key={index}
          className={`
            ${getStarSize()}
            ${index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"}
            ${!readOnly ? "cursor-pointer" : ""}
            transition-colors
          `}
          onClick={() => handleClick(index)}
          onMouseEnter={() => {
            if (readOnly || !onRatingChange) return
            onRatingChange(index + 1)
          }}
        />
      ))}
    </div>
  )
}
