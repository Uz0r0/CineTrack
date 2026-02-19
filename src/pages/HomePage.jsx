import { useFetchMovies } from "../hooks/useFetchMovies";
import { Link } from "react-router-dom";
import { MovieCard, Loader } from "../components";

const HomePage = () => {
  const { data: movies, isLoading } = useFetchMovies("/trending/movie/week");

  if (isLoading) {
    return (
      <Loader />
    );
  }

  return (
    <div className="min-h-screen pb-20">
      {movies.length > 0 && (
        <div className="relative h-[70vh] w-full mb-10">
          <img  
            src={`https://image.tmdb.org/t/p/original${movies[0].backdrop_path}`}
            className="w-full h-full object-cover opacity-60"
            alt="Hero"
          />
          <div className="absolute bottom-0 left-0 p-8 md:p-16 bg-linear-to-t from-black to-transparent w-full">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 uppercase italic">
              {movies[0].title}
            </h1>
            <p className="text-gray-300 max-w-2xl text-sm md:text-base line-clamp-3 mb-6">
              {movies[0].overview}
            </p>
            <Link
              to={`movie/${movies[0].id}`}
              className="bg-brand-primary text-black uppercase px-8 py-3 rounded font-bold hover:bg-white transition-colors cursor-pointer"
            >
              see details
            </Link>
          </div>
        </div>
      )}

      <div className="px-6 md:px-12">
        <h2 className="text-brand-primary text-2xl font-bold mb-6 uppercase tracking-widest">
          Trending Movies
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
      <div className="mt-20 flex justify-center items-center">
        <Link
          to="/movie"
          className="inline-block px-8 py-3 border border-zinc-800 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:border-brand-primary hover:text-brand-primary transition-all duration-300 rounded-sm"
        >
          Want to see more? Click here
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
