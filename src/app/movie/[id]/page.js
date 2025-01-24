"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMovieQuery } from "@/hooks/useMoviesQuery";
import useFavorites from "@/hooks/useFavorites";
import { getFavoriteById, updateFavorite } from "@/utils/indexDB";

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
  CircularProgress,
} from "@mui/material";
import { Star, Favorite, FavoriteBorder, StarHalf } from "@mui/icons-material";

export default function MovieDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data, isLoading, isError, error } = useMovieQuery(id);

  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some((movie) => movie.imdbID === id);

  const [offlineMovie, setOfflineMovie] = useState(null);

  const handleBack = () => {
    if (!sessionStorage.getItem("searchQuery")) {
      sessionStorage.removeItem("searchQuery");
    }
    router.back();
  };

  useEffect(() => {
    if (isError && !navigator.onLine) {
      getFavoriteById(id).then((fav) => {
        if (fav) {
          setOfflineMovie(fav);
        }
      });
    } else if (data) {
      updateFavorite(data).catch((err) =>
        console.error("Nie udało się zaktualizować DB:", err)
      );
    }
  }, [isError, data, id]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

  if (isError && !offlineMovie) {
    return (
      <Typography variant="h5" color="error">
        Błąd: {error?.message || "Nie udało się pobrać szczegółów filmu."}
      </Typography>
    );
  }

  const movie = offlineMovie || data;
  if (!movie) {
    return (
      <Typography variant="h5">
        Nie znaleziono filmu (brak danych w trybie offline).
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: "1200px", margin: "auto", padding: "1rem" }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={4}>
          <MoviePoster poster={movie.Poster} title={movie.Title} />
        </Grid>
        <Grid item xs={12} md={8}>
          <MovieDetailsCard
            movie={movie}
            isFavorite={isFavorite}
            toggleFavorite={() => toggleFavorite(movie)}
            handleBack={handleBack}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

function MoviePoster({ poster, title }) {
  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
      {poster && poster !== "N/A" && (
        <CardMedia component="img" image={poster} alt={title} />
      )}
    </Card>
  );
}

function MovieDetailsCard({ movie, isFavorite, toggleFavorite, handleBack }) {
  const rating = parseFloat(movie.imdbRating) || 0;
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {movie.Title} ({movie.Year})
        </Typography>

        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          {movie.Genre} | {movie.Runtime} | {movie.Director}
        </Typography>

        <MovieRating
          rating={rating}
          fullStars={fullStars}
          halfStar={halfStar}
        />

        <Typography variant="body1" paragraph>
          {movie.Plot}
        </Typography>

        <ActionButtons
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
          handleBack={handleBack}
        />
      </CardContent>
    </Card>
  );
}

function MovieRating({ rating, fullStars, halfStar }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={i} color="primary" fontSize="small" />
      ))}
      {halfStar && <StarHalf color="primary" />}
      <Typography sx={{ marginLeft: "0.5rem", fontSize: "1rem" }}>
        {rating}/10
      </Typography>
    </Box>
  );
}

function ActionButtons({ isFavorite, toggleFavorite, handleBack }) {
  return (
    <Box sx={{ display: "flex", gap: 2, marginTop: "1rem" }}>
      <Tooltip title={isFavorite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}>
        <IconButton
          onClick={toggleFavorite}
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

      <Button variant="contained" onClick={handleBack}>
        Powrót do listy
      </Button>
    </Box>
  );
}
