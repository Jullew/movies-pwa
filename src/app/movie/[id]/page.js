"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useMovieQuery } from "@/hooks/useMoviesQuery";
import useFavorites from "@/hooks/useFavorites";
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

  const handleBack = () => {
    if (!sessionStorage.getItem("searchQuery")) {
      sessionStorage.removeItem("searchQuery");
    }
    router.back();
  };

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );

  if (isError)
    return (
      <Typography variant="h5" color="error">
        Błąd: {error.message}
      </Typography>
    );
  if (!data) return <Typography variant="h5">Nie znaleziono filmu.</Typography>;

  return (
    <Box sx={{ maxWidth: "1200px", margin: "auto", padding: "1rem" }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={4}>
          <MoviePoster poster={data.Poster} title={data.Title} />
        </Grid>

        <Grid item xs={12} md={8}>
          <MovieDetailsCard
            movie={data}
            isFavorite={isFavorite}
            toggleFavorite={() => toggleFavorite(data)}
            handleBack={handleBack}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

const MoviePoster = ({ poster, title }) => (
  <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
    {poster && poster !== "N/A" && (
      <CardMedia component="img" image={poster} alt={title} />
    )}
  </Card>
);

const MovieDetailsCard = ({
  movie,
  isFavorite,
  toggleFavorite,
  handleBack,
}) => {
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
};

const MovieRating = ({ rating, fullStars, halfStar }) => (
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

const ActionButtons = ({ isFavorite, toggleFavorite, handleBack }) => (
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
