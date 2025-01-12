"use client";

import React from "react";
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
import { Star, StarBorder, Delete } from "@mui/icons-material";
import Link from "next/link";

export default function MovieCard({
  movie,
  isFavorite,
  onToggleFavorite,
  onRemove,
}) {
  const rating = parseFloat(movie.imdbRating) || 0;
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        boxShadow: 4,
        borderRadius: 3,
        overflow: "hidden",
        backgroundColor: "#1e1e1e",
        color: "white",
        position: "relative",
      }}
    >
      {movie.Poster && movie.Poster !== "N/A" && (
        <CardMedia
          component="img"
          sx={{ height: 450, objectFit: "cover" }}
          image={movie.Poster}
          alt={movie.Title}
        />
      )}

      <CardContent sx={{ padding: "1.5rem" }}>
        <Typography variant="h5" fontWeight="bold">
          {movie.Title} ({movie.Year})
        </Typography>

        <Typography variant="subtitle1" color="gray" gutterBottom>
          {movie.Genre} | {movie.Runtime} | Reżyser: {movie.Director}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            marginBottom: "1rem",
          }}
        >
          {Array.from({ length: fullStars }).map((_, i) => (
            <Star key={i} color="primary" />
          ))}
          {halfStar && <Star color="primary" />}
          <Typography
            sx={{ fontSize: "1.3rem", fontWeight: "bold", color: "#fdd835" }}
          >
            {movie.imdbRating}/10
          </Typography>
        </Box>

        <Typography variant="body2" color="white" sx={{ opacity: 0.8 }}>
          <strong>Obsada:</strong> {movie.Actors}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1.5rem",
          }}
        >
          <Link href={`/movie/${movie.imdbID}`} passHref>
            <Button
              variant="contained"
              color="primary"
              sx={{ fontWeight: "bold" }}
            >
              Szczegóły
            </Button>
          </Link>

          {isFavorite !== undefined ? (
            <Tooltip
              title={isFavorite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
            >
              <IconButton
                onClick={() => onToggleFavorite(movie)}
                color="primary"
              >
                {isFavorite ? <Star /> : <StarBorder />}
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Usuń z ulubionych">
              <IconButton
                onClick={() => onRemove(movie.imdbID)}
                sx={{
                  color: "#ff1744",
                  backgroundColor: "rgba(255, 0, 0, 0.1)",
                  "&:hover": { backgroundColor: "rgba(255, 0, 0, 0.3)" },
                }}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
