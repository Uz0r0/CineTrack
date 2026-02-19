import { useFavourites } from "../hooks/useFavourites";
import { useTrailer } from "../hooks/useTrailer";
import { Link } from "react-router-dom";
import { Play, Info, Plus, Check, Star } from "lucide-react";
import { IMG_BASE_URL } from "../constants";

const MovieCard = ({ movie }) => {
  const { toggleFavourite, isFavourite } = useFavourites();
  const { watchTrailer } = useTrailer();

  const isFav = isFavourite(movie.id);
  const isMovie = movie.title !== undefined;
  const posterPath = movie.poster_path || movie.backdrop_path;
  const imageUrl = posterPath
    ? `${IMG_BASE_URL}${posterPath}`
    : "/placeholder-poster.jpg";

  const handleFavClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavourite(movie);
  };

  const handlePlayClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    watchTrailer(movie.id, isMovie, movie.title || movie.name);
  };

  return (
    <Link to={isMovie ? `/movie/${movie.id}` : `/tv/${movie.id}`}>
      <div className="group relative w-full aspect-2/3 overflow-hidden rounded-md bg-zinc-900 transition-all duration-300 hover:scale-105 hover:z-10 shadow-lg cursor-pointer">
        <img
          src={imageUrl}
          alt={movie.title || movie.name}
          className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-40"
          loading="lazy"
        />

        <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-linear-to-t from-black via-black/60 to-transparent">
          <div className="flex gap-2 mb-4 translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
            <button
              onClick={handlePlayClick}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary text-black hover:bg-white transition-colors cursor-pointer"
            >
              <Play size={20} fill="currentColor" />
            </button>

            <button
              onClick={handleFavClick}
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all cursor-pointer active:scale-90
              ${
                isFav
                  ? "border-emerald-500 bg-emerald-500/20 text-emerald-500"
                  : "border-zinc-500 bg-zinc-900/50 text-white hover:border-white"
              }`}
            >
              {isFav ? <Check size={20} /> : <Plus size={20} />}
            </button>

            <button className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-zinc-500 bg-zinc-900/50 text-white hover:border-white transition-colors ml-auto cursor-pointer">
              <Info size={20} />
            </button>
          </div>

          <div className="space-y-1">
            <h3 className="font-heading-secondary text-lg leading-tight text-white line-clamp-1">
              {movie.title || movie.name}
            </h3>

            <div className="flex items-center gap-3 text-xs font-medium">
              <span className="flex items-center gap-1 text-brand-primary">
                <Star size={14} fill="currentColor" />
                {movie.vote_average?.toFixed(1)}
              </span>
              <span className="text-zinc-400">
                {new Date(
                  movie.release_date || movie.first_air_date,
                ).getFullYear() || "N/A"}
              </span>
              <span className="border border-zinc-600 px-1 text-[10px] text-zinc-400 uppercase">
                HD
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
