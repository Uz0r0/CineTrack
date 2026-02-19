import { useState, useEffect } from "react";

export const useFavourites = () => {
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem("cinetrack-favs");
    return saved ? JSON.parse(saved) : [];
  });

  const isFavourite = (id) => favourites.some((item) => item.id === id);

  const toggleFavourite = (movie) => {
    const saved = JSON.parse(localStorage.getItem("cinetrack-favs")) || [];
    const isFav = saved.some((item) => item.id === movie.id);

    let updated;
    if (isFav) {
      updated = saved.filter((item) => item.id !== movie.id);
    } else {
      updated = [...saved, movie];
    }

    localStorage.setItem("cinetrack-favs", JSON.stringify(updated));
    setFavourites(updated);

    window.dispatchEvent(new Event("fav-update"));
  };

  useEffect(() => {
    const syncFavs = () => {
      const saved = JSON.parse(localStorage.getItem("cinetrack-favs")) || [];
      setFavourites(saved);
    };

    window.addEventListener("storage", syncFavs); 
    window.addEventListener("fav-update", syncFavs); 

    return () => {
      window.removeEventListener("storage", syncFavs);
      window.removeEventListener("fav-update", syncFavs);
    };
  }, []);

  return { favourites, toggleFavourite, isFavourite };
};
