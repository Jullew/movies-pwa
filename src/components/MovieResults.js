"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { addFavorite, removeFavorite, getFavorites } from "@/utils/indexDB";
import MovieCard from "@/components/MovieCard";

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
      } else {
        await addFavorite(movie);
        setFavorites([...favorites, movie.imdbID]);
      }
    } catch (err) {
      console.error("Błąd zapisu do IndexedDB:", err);
    }
  };

  if (!movies || movies.length === 0) {
    return (
      <Typography variant="h5" align="center">
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
      sx={{ width: "80%" }}
    >
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          isFavorite={favorites.includes(movie.imdbID)}
          onToggleFavorite={handleToggleFavorite}
        />
      ))}
    </Box>
  );
}
