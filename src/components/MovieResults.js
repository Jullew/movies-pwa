"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import useFavorites from "@/hooks/useFavorites";
import MovieCard from "@/components/MovieCard";

export default function MovieResults({ movies }) {
  const { favorites, toggleFavorite } = useFavorites();

  if (!movies || movies.length === 0) {
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
      {movies.map((movie) => {
        const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);
        return (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
          />
        );
      })}
    </Box>
  );
}
