import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useMovieStore } from "../../store/movieStore";

const SEARCH_DEBOUNCE_MS = 300;

export default function MovieSearch() {
  const term = useMovieStore((state) => state.term);
  const setTerm = useMovieStore((state) => state.setTerm);
  const [keyword, setKeyword] = useState(term);

  useEffect(() => {
    if (keyword === term) return;

    const timeoutId = window.setTimeout(() => {
      setTerm(keyword);
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [keyword, setTerm, term]);

  return (
    <div className="pb-8 space-y-20 bg-black px-4">
      <div className="flex items-center justify-between"></div>

      <div className="relative mx-auto w-full max-w-5xl rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>

        <input
          type="text"
          placeholder="영화를 검색해주세요."
          className="block w-full rounded-md border-0 py-5 pl-10 text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
    </div>
  );
}
