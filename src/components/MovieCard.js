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
import { Star, StarBorder } from "@mui/icons-material";
import Link from "next/link";

export default function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  if (!movie) {
    return (
      <Typography variant="h6" align="center">
        Brak danych o filmie
      </Typography>
    );
  }

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
      <Link href={`/movie/${movie.imdbID}`} passHref>
        <CardMedia
          component="img"
          sx={{ height: 450, objectFit: "cover" }}
          image={movie.Poster || "/placeholder.jpg"}
          alt={movie.Title || "Brak tytułu"}
        />
      </Link>

      <CardContent sx={{ padding: "1.5rem" }}>
        <Typography variant="h5" fontWeight="bold">
          {movie.Title ?? "Brak tytułu"} ({movie.Year ?? "Brak roku"})
        </Typography>
        <Typography variant="subtitle1" color="gray" gutterBottom>
          {movie.Genre ?? "Brak gatunku"} |{" "}
          {movie.Runtime ?? "Brak czasu trwania"} | Reżyser:{" "}
          {movie.Director ?? "Brak reżysera"}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <Box sx={{ display: "flex" }}>
            {[...Array(Math.floor(movie.imdbRating || 0))].map((_, i) => (
              <Star key={i} color="primary" />
            ))}
          </Box>
          <Typography
            sx={{ fontSize: "1.3rem", fontWeight: "bold", color: "#fdd835" }}
          >
            {movie.imdbRating ? `${movie.imdbRating}/10` : "Brak oceny"}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1.5rem",
          }}
        >
          <Link href={`/movie/${movie.imdbID}`} passHref>
            <Button variant="contained" color="primary">
              Szczegóły
            </Button>
          </Link>
          <Tooltip
            title={isFavorite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
          >
            <IconButton onClick={() => onToggleFavorite(movie)} color="primary">
              {isFavorite ? <Star /> : <StarBorder />}
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
}
