
import { useState, useMemo, useEffect } from "react";
import dateIdeas from "@/data/dateIdeas";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

type Ratings = { [index: number]: number };

const ROUND_SIZE = 5;
const IDEAS_PER_RESULT = 15;

const DateIdeas = () => {
  const [shownStart, setShownStart] = useState(0);
  const [ratings, setRatings] = useState<Ratings>(() => {
    // Load from localStorage if it exists
    const val = localStorage.getItem("dateIdeaRatings");
    return val ? JSON.parse(val) : {};
  });
  const [showResults, setShowResults] = useState(false);

  // Save ratings to localStorage (so both partners on same device see progress)
  useEffect(() => {
    localStorage.setItem("dateIdeaRatings", JSON.stringify(ratings));
  }, [ratings]);

  // Select the next 5 unrated ideas, skipping those with ratings
  const visibleIdeas = useMemo(() => {
    let filtered: { idea: string; idx: number }[] = [];
    let i = 0;
    let ideasFound = 0;
    while (i < dateIdeas.length && ideasFound < ROUND_SIZE) {
      if (ratings[i] === undefined && i >= shownStart) {
        filtered.push({ idea: dateIdeas[i], idx: i });
        ideasFound += 1;
      }
      i += 1;
    }
    return filtered;
  }, [ratings, shownStart]);

  // How many total rated so far
  const numRated = Object.keys(ratings).length;

  // Show results after every 15 rated
  useEffect(() => {
    if (numRated > 0 && numRated % IDEAS_PER_RESULT === 0) {
      setShowResults(true);
    }
  }, [numRated]);

  // Sorted list of rated ideas
  const ratedIdeasSorted = useMemo(() => {
    const ratedArr = Object.entries(ratings).map(([idx, rating]) => ({
      idx: Number(idx),
      idea: dateIdeas[Number(idx)],
      rating,
    }));
    ratedArr.sort((a, b) => b.rating - a.rating);
    return ratedArr;
  }, [ratings]);

  const handleRate = (idx: number, value: number) => {
    setRatings((prev) => ({ ...prev, [idx]: value }));
  };

  const handleNextRound = () => {
    // Advance to the next batch of unrated ideas
    let next = shownStart;
    let counted = 0;
    while (next < dateIdeas.length && counted < ROUND_SIZE) {
      if (ratings[next] === undefined) counted++;
      next++;
    }
    setShownStart(next);
    setShowResults(false);
  };

  const handleReset = () => {
    setRatings({});
    setShownStart(0);
    setShowResults(false);
    localStorage.removeItem("dateIdeaRatings");
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-2 pb-12 bg-white">
      <div className="fixed inset-0 z-[-1] bg-gradient-to-tr from-pink/30 via-mint/40 to-blue/20" />
      <div className="max-w-lg w-full space-y-6 mt-10 mb-4 mx-auto">
        <h1 className="text-2xl md:text-3xl font-extrabold text-center text-primary mb-2">
          Couple Date Ideas
        </h1>
        <p className="text-center text-base md:text-lg text-gray-600">
          Rate each date idea from 1 to 5 stars. Every 15 date ideas, you'll see your top ranked dates so far!
        </p>
      </div>
      {showResults ? (
        <div className="bg-card rounded-card p-8 shadow-card w-full max-w-xl animate-fade-in mt-4">
          <h2 className="text-xl font-bold mb-2 text-center text-blue">Top Date Ideas</h2>
          {ratedIdeasSorted.length === 0 ? (
            <p>No ideas rated yet.</p>
          ) : (
            <ol className="list-decimal list-inside space-y-2">
              {ratedIdeasSorted.slice(0, 10).map(({ idx, idea, rating }, i) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="font-semibold flex-1">{idea}</span>
                  <span className="flex gap-1 text-pink">
                    {[1,2,3,4,5].map(s => (
                      <Star
                        key={s}
                        size={18}
                        className={s <= rating ? "text-pink fill-pink" : "text-gray-300"}
                        fill={s <= rating ? "#FF6B91" : "none"}
                      />
                    ))}
                  </span>
                </li>
              ))}
            </ol>
          )}
          <Button variant="blue" className="mt-6 w-full" onClick={handleNextRound}>
            Continue Ranking More Ideas
          </Button>
          <Button variant="ghost" className="mt-2 w-full" onClick={handleReset}>
            Reset All Rankings
          </Button>
        </div>
      ) : (
        <div className="w-full max-w-xl space-y-4 animate-fade-in mt-6">
          {visibleIdeas.length === 0 ? (
            <div className="bg-card rounded-card p-8 text-center shadow-card">
              <p className="mb-5 font-semibold text-lg">You’ve rated all 100 ideas!</p>
              <Button variant="ghost" onClick={handleReset}>
                Start Over
              </Button>
            </div>
          ) : (
            <form className="space-y-6">
              {visibleIdeas.map(({ idea, idx }) => (
                <div className="bg-card rounded-card shadow-card p-5 flex items-center gap-5" key={idx}>
                  <div className="text-lg flex-1">{idea}</div>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map((star) => (
                      <button
                        key={star}
                        className={`p-0 bg-transparent border-none ${
                          ratings[idx] >= star ? "text-pink" : "text-gray-300"
                        }`}
                        type="button"
                        onClick={() => handleRate(idx, star)}
                        aria-label={`${star} star${star>1 ? "s" : ""}`}
                      >
                        <Star
                          size={24}
                          strokeWidth={2.3}
                          className={
                            ratings[idx] >= star ? "text-pink fill-pink" : "text-gray-300"
                          }
                          fill={ratings[idx] >= star ? "#FF6B91" : "none"}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <Button
                type="button"
                className="w-full"
                onClick={handleNextRound}
                disabled={visibleIdeas.some(({ idx }) => ratings[idx] === undefined)}
                variant="pink"
              >
                Submit Ratings
              </Button>
            </form>
          )}
          <div className="text-sm text-gray-400 mt-6 text-center">
            Rated: <b className="text-dark">{numRated}</b> / {dateIdeas.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateIdeas;
