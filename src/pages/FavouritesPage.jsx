import { Link } from "react-router-dom";
import { useFavourites } from "../hooks/useFavourites"; 
import { MovieCard } from "../components";
import { Film } from "lucide-react"; 

const FavouritesPage = () => {
  const { favourites } = useFavourites();

  return (
    <div className="min-h-screen pb-20">
      <div className="px-6 md:px-12 mt-10">
        <h2 className="text-brand-primary text-2xl font-bold mb-6 uppercase tracking-widest">
          Your Favourites
        </h2>

        {favourites.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {favourites.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-65 text-center">
            <Film size={64} className="text-zinc-800 mb-6" />
            <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tighter">
              Your list is empty
            </h3>
            <p className="text-zinc-500 mb-10 max-w-xs">
              Looks like you haven't added any movies or TV shows to your
              favourites yet.
            </p>

            <Link
              to="/movie"
              className="inline-block px-8 py-3 border border-zinc-800 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:border-brand-primary hover:text-brand-primary transition-all duration-300 rounded-sm"
            >
              Explore Movies
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavouritesPage;
