import { useState, useEffect, useRef } from "react";
import { X, Search as SearchIcon, Loader2 } from "lucide-react";
import { searchMovies } from "../services/movieService";
import MovieCard from "./MovieCard";

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsLoading(true);
      const data = await searchMovies(query);
      setResults(data.filter((m) => m.poster_path));
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const modalWrapperClass = `fixed inset-0 z-[100] flex items-start justify-center bg-black/80 backdrop-blur-md pt-20 px-4 transition-all duration-300 ${
    isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
  }`;

  return (
    <div className={modalWrapperClass} onClick={onClose}>
      <div
        className="w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-zinc-800 flex items-center gap-4 bg-zinc-900/50">
          <SearchIcon className="text-brand-primary" size={22} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for movies..."
            className="flex-1 bg-transparent border-none outline-none text-xl text-white placeholder:text-zinc-600"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-all"
          >
            <X size={24} className="cursor-pointer"/>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2
                className="animate-spin text-brand-primary mb-2"
                size={32}
              />
              <p className="text-zinc-500 text-sm italic">Searching TMDB...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {results.map((movie) => (
                <div key={movie.id} onClick={onClose}>
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-zinc-500">
              {query
                ? `No results for "${query}"`
                : "Search results will appear here"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
