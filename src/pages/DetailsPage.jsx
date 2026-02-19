import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { useFavourites } from "../hooks/useFavourites";
import { useTrailer } from "../hooks/useTrailer"; 
import {
  Star,
  Clock,
  Calendar,
  Play,
  Plus,
  Check,
  ArrowLeft,
} from "lucide-react";
import { fetchMovieDetails } from "../services/movieService";
import { IMG_BASE_URL_ORG } from "../constants";
import { Loader } from "../components";

const DetailsPage = ({ isMovie }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { toggleFavourite, isFavourite } = useFavourites();
  const { watchTrailer, loading: trailerLoading } = useTrailer(); 

  useEffect(() => {
    const getDetails = async () => {
      setLoading(true);
      const content = isMovie ? "movie" : "tv";
      const details = await fetchMovieDetails(id, content);
      setData(details);
      setLoading(false);
    };
    getDetails();
  }, [id, isMovie]);

  if (loading) return <Loader />;

  if (!data)
    return (
      <div className="text-center py-20 text-white">Content not found.</div>
    );

  const isFav = isFavourite(data.id);

  return (
    <div className="min-h-screen bg-zinc-950 text-white relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 z-50 flex items-center gap-2 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full border border-white/10 transition-all cursor-pointer group"
      >
        <ArrowLeft
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span className="hidden md:inline font-medium">Back</span>
      </button>

      <div className="relative min-h-[60vh] md:h-[75vh] w-full flex items-end">
        <div className="absolute inset-0">
          <img
            src={`${IMG_BASE_URL_ORG}${data.backdrop_path}`}
            className="w-full h-full object-cover opacity-30"
            alt=""
          />
          <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
        </div>

        <div className="relative container mx-auto px-4 md:px-12 pb-10">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-end">
            <div className="w-48 md:w-72 shrink-0 shadow-2xl">
              <img
                src={`${IMG_BASE_URL_ORG}${data.poster_path}`}
                className="rounded-lg border border-zinc-800 w-full"
                alt={data.title || data.name}
              />
            </div>

            <div className="flex-1 text-center md:text-left space-y-4">
              <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight">
                {data.title || data.name}
              </h1>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-sm md:text-base font-medium text-zinc-300">
                <span className="flex items-center gap-1.5 text-brand-primary">
                  <Star size={20} fill="currentColor" />{" "}
                  {data.vote_average?.toFixed(1)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={20} />{" "}
                  {data.runtime || data.episode_run_time?.[0] || "N/A"} min
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={20} />{" "}
                  {new Date(
                    data.release_date || data.first_air_date,
                  ).getFullYear()}
                </span>
              </div>

              <div className="flex gap-4 pt-4 items-center justify-center md:justify-start">
                <button
                  disabled={trailerLoading}
                  onClick={() =>
                    watchTrailer(data.id, isMovie, data.title || data.name)
                  }
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-primary text-black px-10 py-3.5 rounded-full font-bold hover:bg-white transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  <Play size={22} fill="currentColor" />
                  {trailerLoading ? "Loading..." : "Watch Trailer"}
                </button>
                <button
                  onClick={() => toggleFavourite(data)}
                  className={`p-3.5 rounded-full border-2 transition-all active:scale-90 cursor-pointer ${
                    isFav
                      ? "border-emerald-500 bg-emerald-500/20 text-emerald-500"
                      : "border-zinc-500 text-white"
                  }`}
                >
                  {isFav ? <Check size={26} /> : <Plus size={26} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-5 text-brand-primary uppercase tracking-widest border-l-4 border-brand-primary pl-4">
              Overview
            </h2>
            <p className="text-zinc-400 leading-relaxed text-lg md:text-xl">
              {data.overview || "No overview available."}
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-brand-primary uppercase tracking-widest border-l-4 border-brand-primary pl-4">
              Top Cast
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {data.credits?.cast?.slice(0, 4).map((person) => (
                <div
                  key={person.id}
                  className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800 hover:bg-zinc-800 transition-colors"
                >
                  <p className="font-bold truncate">{person.name}</p>
                  <p className="text-xs text-zinc-500 truncate mt-1">
                    {person.character}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-8">
          <div className="bg-zinc-900/40 p-8 rounded-2xl border border-zinc-800 space-y-6">
            <div>
              <h4 className="text-zinc-500 text-xs uppercase font-black tracking-widest mb-3">
                Genres
              </h4>
              <div className="flex flex-wrap gap-2">
                {data.genres?.map((g) => (
                  <span
                    key={g.id}
                    className="text-[11px] font-bold bg-zinc-800 border border-zinc-700 text-zinc-300 px-3 py-1.5 rounded-md uppercase"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-zinc-500 text-xs uppercase font-black tracking-widest mb-1">
                  Status
                </h4>
                <p className="font-medium">{data.status}</p>
              </div>
              <div>
                <h4 className="text-zinc-500 text-xs uppercase font-black tracking-widest mb-1">
                  Language
                </h4>
                <p className="font-medium uppercase">
                  {data.original_language}
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DetailsPage;
