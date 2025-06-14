
import { Heart } from "lucide-react";

export default function Header() {
  return (
    <header className="flex justify-center items-center pt-6 pb-6 select-none">
      <Heart size={32} className="text-primary mr-2 drop-shadow" />
      <span className="font-extrabold text-2xl sm:text-3xl tracking-tight text-primary" style={{letterSpacing: ".04em"}}>
        Couple Connection
      </span>
    </header>
  );
}
