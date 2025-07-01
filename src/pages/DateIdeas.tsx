import { useState, useMemo, useEffect } from "react";
import dateIdeas from "@/data/dateIdeas";
import { Button } from "@/components/ui/button";

type Ratings = { [index: number]: number };

// Show one idea at a time now
const ROUND_SIZE = 1;
const IDEAS_PER_RESULT = 15;

const DateIdeas = () => {
  const [shownStart, setShownStart] = useState(0);
  const [ratings, setRatings] = useState<Ratings>(() => {
    const val = localStorage.getItem("dateIdeaRatings");
    return val ? JSON.parse(val) : {};
  });
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    localStorage.setItem("dateIdeaRatings", JSON.stringify(ratings));
  }, [ratings]);

  // Only show 1 idea at a time: idea at index = shownStart
  const visibleIdeas = useMemo(() => {
    if (shownStart >= dateIdeas.length) return [];
    return [{ idea: dateIdeas[shownStart], idx: shownStart }];
  }, [shownStart]);

  const numRated = Object.keys(ratings).length;

  useEffect(() => {
    if (numRated > 0 && numRated % IDEAS_PER_RESULT === 0) {
      setShowResults(true);
    }
  }, [numRated]);

  // Sort rated ideas descending by rating
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
    setShownStart((prev) => prev + ROUND_SIZE);
    setShowResults(false);
  };

  const handleReset = () => {
    setRatings({});
    setShownStart(0);
    setShowResults(false);
    localStorage.removeItem("dateIdeaRatings");
  };

  // Check if current idea has been rated
  const currentIdeaRated = visibleIdeas.length > 0 && ratings[visibleIdeas[0].idx] !== undefined;

  return (
    <div className="min-h-screen flex flex-col items-center px-2 pb-12 bg-white">
      <div className="fixed inset-0 z-[-1] bg-gradient-to-tr from-pink/30 via-mint/40 to-blue/20" />
      <div className="max-w-lg w-full space-y-6 mt-10 mb-4 mx-auto">
        <h1 className="text-2xl md:text-3xl font-extrabold text-center text-primary mb-2">
          Couple Date Ideas
        </h1>
        <p className="text-center text-base md:text-lg text-gray-600">
          Rate each date idea from 0 to 100 using the slider. Every 15 date ideas, you'll see your top ranked dates so far!
        </p>
      </div>
      {showResults ? (
        <div className="bg-card rounded-card p-8 shadow-card w-full max-w-xl animate-fade-in mt-4">
          <h2 className="text-xl font-bold mb-2 text-center text-blue">Top Date Ideas</h2>
          {ratedIdeasSorted.length === 0 ? (
            <p>No ideas rated yet.</p>
          ) : (
            <>
              <p className="mb-4 text-center text-lg italic text-pink">
                Oh, it appears your top 3 ideas were:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-lg font-semibold">
                {ratedIdeasSorted.slice(0, 3).map(({ idea }, rank) => (
                  <li key={rank} className="text-primary">
                    {rank + 1}. {idea}
                  </li>
                ))}
              </ol>
            </>
          )}
          <Button variant="blue" className="mt-6 w-full" onClick={handleReset}>
            Reset & Start Over
          </Button>
        </div>
      ) : (
        <div className="w-full max-w-xl space-y-4 animate-fade-in mt-6">
          {visibleIdeas.length === 0 ? (
            <div className="bg-card rounded-card p-8 text-center shadow-card">
              <p className="mb-5 font-semibold text-lg">You’ve rated all {dateIdeas.length} ideas!</p>
              <Button variant="ghost" onClick={handleReset}>
                Start Over
              </Button>
            </div>
          ) : (
            <form className="space-y-6">
              {visibleIdeas.map(({ idea, idx }) => (
                <div key={idx} className="bg-card rounded-card shadow-card p-5 flex flex-col gap-4">
                  <div className="text-xl font-semibold text-center">{idea}</div>
                  <div className="flex flex-col items-center gap-1 w-full max-w-xs mx-auto">
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={ratings[idx] ?? 50}
                      onChange={(e) => handleRate(idx, Number(e.target.value))}
                      className="w-full"
                    />
                    <span className="text-sm text-gray-600 select-none">Rank: {ratings[idx] ?? 50}</span>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                className="w-full"
                onClick={handleNextRound}
                disabled={!currentIdeaRated}
                variant="default"
              >
                Submit Ranking
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
