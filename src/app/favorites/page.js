"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import useFavorites from "@/hooks/useFavorites";
import MovieResults from "@/components/MovieResults";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <Typography variant="h5" align="center" sx={{ mt: 4 }}>
        Brak ulubionych filmów.
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: "1600px", margin: "auto", padding: "2rem" }}>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        Ulubione Filmy
      </Typography>
      <MovieResults movies={favorites} />
    </Box>
  );
}
