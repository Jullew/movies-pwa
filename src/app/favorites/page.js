"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";
import Link from "next/link";
import { getFavorites, removeFavorite } from "@/utils/indexDB";

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
        gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
        gap={3}
        padding={2}
      >
        {favorites.map((movie) => (
          <Card
            key={movie.imdbID}
            sx={{ boxShadow: 3, borderRadius: 3, position: "relative" }}
          >
            {movie.Poster && movie.Poster !== "N/A" && (
              <CardMedia
                component="img"
                height="350"
                image={movie.Poster}
                alt={movie.Title}
              />
            )}
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                {movie.Title}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {movie.Year}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "1rem",
                }}
              >
                <Link href={`/movie/${movie.imdbID}`} passHref>
                  <Button
                    variant="contained"
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "#1976d2",
                      "&:hover": { backgroundColor: "#1565c0" },
                    }}
                  >
                    Szczegóły
                  </Button>
                </Link>

                <Tooltip title="Usuń z ulubionych">
                  <IconButton
                    onClick={() => handleRemoveFavorite(movie.imdbID)}
                    sx={{
                      color: "#f50057",
                      backgroundColor: "rgba(255, 0, 0, 0.1)",
                      "&:hover": { backgroundColor: "rgba(255, 0, 0, 0.3)" },
                    }}
                  >
                    <Star />
                  </IconButton>
                </Tooltip>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
