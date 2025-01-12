"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { getFavorites, removeFavorite } from "@/utils/indexDB";
import MovieCard from "@/components/MovieCard";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function fetchFavorites() {
      const favs = await getFavorites();
      setFavorites(favs);
    }
    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (imdbID) => {
    await removeFavorite(imdbID);
    setFavorites((prev) => prev.filter((movie) => movie.imdbID !== imdbID));
  };

  if (favorites.length === 0) {
    return (
      <Typography variant="h5" align="center" sx={{ mt: 4 }}>
        Brak ulubionych filmów.
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: "1200px", margin: "auto", padding: "2rem" }}>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        Ulubione Filmy
      </Typography>

      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        gap={3}
        padding={2}
      >
        {favorites.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onRemove={handleRemoveFavorite}
          />
        ))}
      </Box>
    </Box>
  );
}
