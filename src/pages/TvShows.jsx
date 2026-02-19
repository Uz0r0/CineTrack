import { useState } from "react";
import { useFetchMovies } from "../hooks/useFetchMovies";
import { useGenres } from "../hooks/useGenres";
import { MovieCard, Loader } from "../components";

const TvShows = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [page, setPage] = useState(1);

  const { genres, isLoading: genresLoading } = useGenres("tv");

  const {
    data: tvShows,
    isLoading,
    isFetchingMore,
  } = useFetchMovies(
    selectedGenre ? "/discover/tv" : "/trending/tv/week",
    page,
    selectedGenre ? { with_genres: selectedGenre } : {},
  );

  const handleGenreChange = (id) => {
    setSelectedGenre(id);
    setPage(1);
  };

  if (genresLoading || (isLoading && page === 1)) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="px-6 md:px-12 mt-10">
        <div className="flex flex-wrap gap-3 mb-10">
          {genres.map((genre) => (
            <button
              key={genre.id || "all"}
              onClick={() => handleGenreChange(genre.id)}
              className={`px-6 py-2 rounded-full border text-xs font-bold uppercase tracking-widest transition-all cursor-pointer
                  ${
                    selectedGenre === genre.id
                      ? "bg-brand-primary border-brand-primary text-black"
                      : "border-zinc-700 text-zinc-400 hover:border-brand-primary hover:text-white"
                  }`}
            >
              {genre.name}
            </button>
          ))}
        </div>

        <h2 className="text-brand-primary text-2xl font-bold mb-6 uppercase tracking-widest">
          {selectedGenre
            ? genres.find((genre) => genre.id === selectedGenre)?.name
            : "Trending TV-SHOWS"}
        </h2>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-brand-primary"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {tvShows.map((show, index) => (
                <MovieCard key={`${show.id}-${index}`} movie={show} />
              ))}
            </div>

            {tvShows.length > 0 && (
              <div className="mt-16 flex justify-center">
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={isFetchingMore}
                  className="nline-block px-8 py-3 border border-zinc-800 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:border-brand-primary hover:text-brand-primary transition-all duration-300 rounded-sm cursor-pointer"
                >
                  {isFetchingMore ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TvShows;
