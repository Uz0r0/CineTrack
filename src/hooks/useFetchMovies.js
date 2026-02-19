import { useState, useEffect } from "react";
import { fetchMovies } from "../services/movieService";

export const useFetchMovies = (endpoint, page = 1, extraParams = {}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      if (page === 1) setIsLoading(true);
      else setIsFetchingMore(true);

      try {
        const results = await fetchMovies(endpoint, page, extraParams);

        setData((prev) => (page === 1 ? results : [...prev, ...results]));
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
        setIsFetchingMore(false);
      }
    };

    loadData();
  }, [endpoint, page, JSON.stringify(extraParams)]);

  return { data, isLoading, isFetchingMore, error };
};
