
import { Heart, CalendarDays, Star } from "lucide-react";

export default function Logo({ size = 44 }: { size?: number }) {
  return (
    <div className="flex items-center gap-1 select-none">
      <span className="relative flex items-center justify-center w-11 h-11 rounded-full bg-mint/50 shadow-card">
        <Heart
          size={size * 0.44}
          className="absolute top-1 left-1 text-pink drop-shadow"
          strokeWidth={2.4}
          fill="#fccde2"
        />
        <CalendarDays
          size={size * 0.42}
          className="absolute bottom-1 right-1 text-lavender drop-shadow"
          strokeWidth={2.3}
          fill="#ece3fc"
        />
        <Star
          size={size * 0.27}
          className="absolute -top-2 right-[18px] text-yellow"
          strokeWidth={2}
          fill="#fff7d1"
        />
      </span>
      <span
        className="font-extrabold text-2xl sm:text-3xl tracking-tight text-primary"
        style={{ letterSpacing: ".04em", fontFamily: "Nunito, sans-serif" }}
      >
        Truth{" "}
        <span className="inline-block font-extrabold text-mint/90">or</span>{" "}
        Date
      </span>
    </div>
  );
}
