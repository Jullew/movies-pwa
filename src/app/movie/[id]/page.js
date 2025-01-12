"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useMovieQuery } from "@/hooks/useMoviesQuery";
import {
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Star,
  StarBorder,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import { addFavorite, removeFavorite, getFavorites } from "@/utils/indexDB"; // lub services

export default function MovieDetailsPage() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useMovieQuery(id);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    async function checkFavorite() {
      if (id) {
        const favorites = await getFavorites();
        setIsFavorite(favorites.some((movie) => movie.imdbID === id));
      }
    }
    checkFavorite();
  }, [id]);

  const handleAddFavorite = async () => {
    if (data) {
      await addFavorite(data);
      setIsFavorite(true);
    }
  };

  const handleRemoveFavorite = async () => {
    if (data) {
      await removeFavorite(data.imdbID);
      setIsFavorite(false);
    }
  };

  if (isLoading) return <Typography variant="h5">Wczytywanie...</Typography>;
  if (isError)
    return (
      <Typography variant="h5" color="error">
        Błąd: {error.message}
      </Typography>
    );
  if (!data) return <Typography variant="h5">Nie znaleziono filmu.</Typography>;

  const rating = parseFloat(data.imdbRating) || 0;
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;

  return (
    <Box sx={{ maxWidth: "1200px", margin: "auto", padding: "2rem" }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            {data.Poster && data.Poster !== "N/A" && (
              <CardMedia component="img" image={data.Poster} alt={data.Title} />
            )}
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {data.Title} ({data.Year})
              </Typography>

              <Typography
                variant="subtitle1"
                color="textSecondary"
                gutterBottom
              >
                {data.Genre} | {data.Runtime} | {data.Director}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                {Array.from({ length: fullStars }).map((_, i) => (
                  <Star key={i} color="primary" fontSize="small" />
                ))}
                {halfStar && <StarBorder color="primary" />}
                <Typography sx={{ marginLeft: "0.5rem", fontSize: "1rem" }}>
                  {data.imdbRating}/10
                </Typography>
              </Box>

              <Typography variant="body1" paragraph>
                {data.Plot}
              </Typography>

              <Box sx={{ display: "flex", gap: 2, marginTop: "1rem" }}>
                <Tooltip
                  title={
                    isFavorite ? "Usuń z ulubionych" : "Dodaj do ulubionych"
                  }
                >
                  <IconButton
                    onClick={
                      isFavorite ? handleRemoveFavorite : handleAddFavorite
                    }
                    color={isFavorite ? "secondary" : "primary"}
                    sx={{
                      backgroundColor: isFavorite
                        ? "rgba(255, 0, 0, 0.1)"
                        : "rgba(0, 0, 255, 0.1)",
                      "&:hover": {
                        backgroundColor: isFavorite
                          ? "rgba(255, 0, 0, 0.3)"
                          : "rgba(0, 0, 255, 0.3)",
                      },
                      transition: "0.3s",
                    }}
                  >
                    {isFavorite ? <Favorite /> : <FavoriteBorder />}
                  </IconButton>
                </Tooltip>

                <Button
                  variant="contained"
                  href="/"
                  sx={{ fontWeight: "bold" }}
                >
                  Powrót do listy
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
