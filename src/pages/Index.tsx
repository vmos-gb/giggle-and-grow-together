import Logo from "@/components/Logo";
import Header from "@/components/Header";
import CardDeck from "@/components/CardDeck";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Fun pastel background gradient for extra joy!
export default function Index() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-2 bg-blush relative">
      <div className="fixed inset-0 z-[-1] bg-gradient-to-tr from-pink/30 via-mint/40 to-lavender/35" />
      <Header />
      <main className="flex flex-col items-center flex-1 w-full">
        <div className="mb-6 text-center max-w-md">
          <h1 className="text-2xl md:text-3xl font-extrabold text-primary mb-2">
            Laugh, Flirt, & Connect—Every Day!
          </h1>
          <p className="text-base md:text-lg text-gray-600">
            Welcome to <span className="text-mint font-bold">Truth or Date</span>: tap, swipe, and giggle your way through quirky questions and couple challenges!
          </p>
        </div>
        <div className="mb-8">
          <Link to="/date-ideas">
            <Button variant="blue" size="lg" className="rounded-card shadow-card text-lg font-bold">
              💡 Explore Date Ideas
            </Button>
          </Link>
        </div>
        <CardDeck />
        <footer className="w-full mt-16 text-center text-xs text-gray-400">
         &copy; {new Date().getFullYear()} Truth or Date. Made with 💖 for playful hearts.
        </footer>
      </main>
    </div>
  );
}
