"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { addFavorite, removeFavorite, getFavorites } from "@/utils/indexDB";
import MovieCard from "@/components/MovieCard";
import toast, { Toaster } from "react-hot-toast";

export default function MovieResults({ movies }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function fetchFavorites() {
      const favs = await getFavorites();
      setFavorites(favs.map((movie) => movie.imdbID));
    }
    fetchFavorites();
  }, []);

  const handleToggleFavorite = async (movie) => {
    try {
      if (favorites.includes(movie.imdbID)) {
        await removeFavorite(movie.imdbID);
        setFavorites(favorites.filter((id) => id !== movie.imdbID));
        toast.error(`Usunięto z ulubionych: ${movie.Title}`);
      } else {
        await addFavorite(movie);
        setFavorites([...favorites, movie.imdbID]);
        toast.success(`Dodano do ulubionych: ${movie.Title}`);
      }
    } catch (err) {
      console.error("Błąd zapisu do IndexedDB:", err);
      toast.error("Błąd podczas dodawania do ulubionych.");
    }
  };

  if (!movies || !Array.isArray(movies) || movies.length === 0) {
    return (
      <Typography variant="h5" align="center" sx={{ mt: 4 }}>
        Brak wyników do wyświetlenia.
      </Typography>
    );
  }

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
      gap={3}
      padding={2}
      width="100%"
    >
      {movies.map((movie) =>
        movie ? (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            isFavorite={favorites.includes(movie.imdbID)}
            onToggleFavorite={handleToggleFavorite}
          />
        ) : null
      )}
    </Box>
  );
}
