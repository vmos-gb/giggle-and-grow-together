
import { useRef, useState } from "react";
import CardPrompt from "./CardPrompt";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import connectionQuestions from "@/data/connectionQuestions";
import thisOrThatPrompts from "@/data/thisOrThatPrompts";
import { toast, useToast } from "@/hooks/use-toast";

type DeckType = "question" | "thisOrThat";

const decks = {
  question: connectionQuestions,
  thisOrThat: thisOrThatPrompts,
};

function getDeckKey(deck: DeckType) {
  return deck === "question" ? "Questions" : "This or That";
}

function useDeck(deck: DeckType) {
  const [index, setIndex] = useState(0);
  const [favs, setFavs] = useState<number[]>([]);
  const prompts = decks[deck];
  const total = prompts.length;

  const next = () => setIndex(i => (i + 1) % total);
  const prev = () => setIndex(i => (i - 1 + total) % total);
  const set = (i: number) => setIndex(i);

  const toggleFav = () => {
    setFavs(arr =>
      arr.includes(index)
        ? arr.filter(f => f !== index)
        : [...arr, index]
    );
    if (!favs.includes(index)) {
      toast({ title: "Added to favourites!", description: prompts[index] });
    }
  };

  return {
    prompts,
    index,
    current: prompts[index],
    favs,
    isFav: favs.includes(index),
    next,
    prev,
    toggleFav,
    set,
    total,
  };
}

export default function CardDeck() {
  const [deck, setDeck] = useState<DeckType>("question");
  const {
    prompts,
    index,
    current,
    favs,
    isFav,
    next,
    prev,
    toggleFav,
    set,
    total,
  } = useDeck(deck);

  const [showFavs, setShowFavs] = useState(false);

  return (
    <div className="flex flex-col items-center w-full max-w-[430px] mx-auto">
      <div className="mb-4 flex justify-center items-center gap-2">
        <button
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors
           ${deck === "question"
             ? "bg-primary text-white shadow-card"
             : "bg-white text-primary border border-primary"}`}
          onClick={() => { setDeck("question"); setShowFavs(false); }}
        >
          <span className="sr-only">Show questions</span>
          <span className="text-lg font-bold">{/* Icon for accessibility contrast */}</span>
          Questions
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors
            ${deck === "thisOrThat"
              ? "bg-mint text-contrast shadow-card"
              : "bg-white text-mint border border-mint"}`}
          onClick={() => { setDeck("thisOrThat"); setShowFavs(false); }}
        >
          <span className="sr-only">Show this or that prompts</span>
          This or That
        </button>
        <button
          className="ml-2 flex items-center px-3 py-2 text-contrast rounded-full bg-yellow/90 border-none hover:bg-yellow transition"
          onClick={() => setShowFavs((v) => !v)}
        >
          <Star size={18} fill="#FFD600" className="mr-1" />
          <span className="text-[.97em] font-semibold">{favs.length}</span>
        </button>
      </div>
      {showFavs ? (
        <div className="w-full animate-fade-in">
          <div className="font-bold mb-3 text-center">Your Favourites</div>
          {favs.length === 0 ? (
            <div className="text-center text-gray-400 p-8">
              Nothing here yet!
            </div>
          ) : (
            <div className="space-y-4 max-h-[380px] overflow-y-auto">
              {favs.map((i) => (
                <CardPrompt
                  key={i}
                  text={prompts[i]}
                  isFavourite={true}
                  onFavourite={() => {}}
                  showStar={false}
                  index={i}
                  total={total}
                  type={deck}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="w-full animate-fade-in">
          <CardPrompt
            text={current}
            isFavourite={isFav}
            onFavourite={toggleFav}
            index={index}
            total={total}
            type={deck}
          />
          <div className="flex mt-6 justify-between select-none">
            <button
              className="bg-white shadow px-4 py-3 rounded-full border border-pink hover:bg-pink/40 transition active:scale-95"
              aria-label="Previous"
              onClick={prev}
            >
              <ArrowLeft size={24} />
            </button>
            <button
              className="bg-primary text-white px-6 py-3 rounded-full shadow-card font-bold text-base hover:scale-105 active:scale-95 transition"
              aria-label="Next"
              onClick={next}
            >
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
