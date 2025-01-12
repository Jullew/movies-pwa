"use client";

import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
  Button,
} from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";
import Link from "next/link";
import { addFavorite, removeFavorite, getFavorites } from "@/utils/indexDB";

export default function MovieResults({ movies }) {
  const [favorites, setFavorites] = useState([]);

  // Pobieranie ulubionych filmów przy montowaniu komponentu
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
    return <p>Brak wyników do wyświetlenia.</p>;
  }

  return (
    <Grid container spacing={3} padding={3}>
      {movies.map((movie) => (
        <Grid item key={movie.imdbID} xs={12} sm={6} md={4} lg={3}>
          <Card>
            {movie.Poster && movie.Poster !== "N/A" && (
              <CardMedia
                component="img"
                height="300"
                image={movie.Poster}
                alt={movie.Title}
              />
            )}
            <CardContent>
              <Typography variant="h6">{movie.Title}</Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {movie.Year}
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "1rem",
                }}
              >
                <Link href={`/movie/${movie.imdbID}`} passHref>
                  <Button variant="outlined">Szczegóły</Button>
                </Link>
                <Tooltip
                  title={
                    favorites.includes(movie.imdbID)
                      ? "Usuń z ulubionych"
                      : "Dodaj do ulubionych"
                  }
                >
                  <IconButton
                    onClick={() => handleToggleFavorite(movie)}
                    color="primary"
                  >
                    {favorites.includes(movie.imdbID) ? (
                      <Star />
                    ) : (
                      <StarBorder />
                    )}
                  </IconButton>
                </Tooltip>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
