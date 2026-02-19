import { useState } from "react";
import { fetchMovieVideos } from "../services/movieService";

export const useTrailer = () => {
  const [loading, setLoading] = useState(false);

  const watchTrailer = async (id, isMovie, title) => {
    setLoading(true);
    try {
      const type = isMovie ? "movie" : "tv";

      const results = await fetchMovieVideos(id, type);

      const video =
        results?.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
        results?.find((v) => v.site === "YouTube");

      if (video?.key) {
        window.open(`https://www.youtube.com/watch?v=${video.key}`, "_blank");
      } else {
        const query = encodeURIComponent(`${title} official trailer`);
        window.open(
          `https://www.youtube.com/results?search_query=${query}`,
          "_blank",
        );
      }
    } catch (error) {
      console.error("Trailer Hook Error:", error);
      window.open(
        `https://www.youtube.com/results?search_query=${encodeURIComponent(title + " trailer")}`,
        "_blank",
      );
    } finally {
      setLoading(false);
    }
  };

  return { watchTrailer, loading };
};
