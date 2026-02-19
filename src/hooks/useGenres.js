import { useState, useEffect } from "react";
import { fetchGenreList } from "../services/movieService";

export const useGenres = (type = "movie") => {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getGenres = async () => {
      setIsLoading(true);
      const data = await fetchGenreList(type);
      setGenres([{ id: null, name: "All" }, ...data]);
      setIsLoading(false);
    };

    getGenres();
  }, [type]);

  return { genres, isLoading };
};
