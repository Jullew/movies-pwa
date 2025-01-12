"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { addFavorite, removeFavorite, getFavorites } from "@/utils/indexDB";

export default function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const favs = await getFavorites();
      setFavorites(favs);
    } catch (error) {
      console.error("Błąd pobierania ulubionych filmów:", error);
      toast.error("Nie udało się załadować ulubionych.");
    }
  };

  const toggleFavorite = async (movie) => {
    try {
      const isAlreadyFavorite = favorites.some(
        (fav) => fav.imdbID === movie.imdbID
      );

      if (isAlreadyFavorite) {
        await removeFavorite(movie.imdbID);
        setFavorites((prev) =>
          prev.filter((fav) => fav.imdbID !== movie.imdbID)
        );
        toast.error(`Usunięto z ulubionych: ${movie.Title}`);
      } else {
        await addFavorite(movie);
        setFavorites((prev) => [...prev, movie]);
        toast.success(`Dodano do ulubionych: ${movie.Title}`);
      }
    } catch (err) {
      console.error("Błąd zapisu do IndexedDB:", err);
      toast.error("Błąd podczas dodawania do ulubionych.");
    }
  };

  return { favorites, toggleFavorite, fetchFavorites };
}
