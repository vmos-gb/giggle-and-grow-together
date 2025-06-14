import { Heart } from "lucide-react";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="flex justify-center items-center pt-6 pb-6 select-none">
      <Logo size={42} />
    </header>
  );
}

