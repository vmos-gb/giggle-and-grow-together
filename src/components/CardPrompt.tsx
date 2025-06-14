
import { Star, Heart, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CardPromptProps {
  text: string;
  isFavourite: boolean;
  onFavourite: () => void;
  showStar?: boolean;
  index: number;
  total: number;
  type: "question" | "thisOrThat";
}

const promptIcons = {
  question: <MessageCircle size={32} className="text-primary/80 mb-2" />,
  thisOrThat: <Heart size={32} className="text-pink mb-2" />,
};

export default function CardPrompt({
  text,
  isFavourite,
  onFavourite,
  showStar = true,
  index,
  total,
  type,
}: CardPromptProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-card shadow-card p-8 flex flex-col items-center animate-fade-in min-h-[300px] max-w-[420px] w-full mx-auto relative",
        "transition-all duration-300",
        "border border-lightgray"
      )}
      style={{ minHeight: 320 }}
    >
      <div className="flex flex-col items-center mb-4">
        {promptIcons[type]}
        <span className={"uppercase text-xs tracking-wide font-bold mb-1 " + (type === "question" ? "text-blue" : "text-pink")}>
          {type === "question" ? "His Question" : "Her This or That"}
        </span>
      </div>
      <div
        className="text-center font-semibold text-xl sm:text-2xl mb-6 text-dark"
        style={{ wordBreak: "break-word" }}
      >
        {text}
      </div>
      <div className="absolute top-4 right-4 flex items-center gap-2">
        {showStar && (
          <button
            aria-label={isFavourite ? "Remove from Favourites" : "Add to Favourites"}
            className={cn(
              "transition-transform text-pink hover:scale-110",
              isFavourite ? "fill-pink" : "fill-none"
            )}
            onClick={onFavourite}
            type="button"
          >
            <Star
              size={28}
              strokeWidth={2.4}
              className={isFavourite ? "text-pink fill-pink" : "text-gray-300"}
              fill={isFavourite ? "#FF6B91" : "none"}
            />
          </button>
        )}
      </div>
      <div className="mt-auto text-xs tracking-tight text-gray-400">{index + 1} / {total}</div>
    </div>
  );
}
