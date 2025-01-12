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
import { Star } from "@mui/icons-material";
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
      <Typography variant="h5" align="center">
        Brak ulubionych filmów.
      </Typography>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Ulubione Filmy
      </Typography>
      <Grid container spacing={3}>
        {favorites.map((movie) => (
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
                  <Tooltip title="Usuń z ulubionych">
                    <IconButton
                      onClick={() => handleRemoveFavorite(movie.imdbID)}
                      color="secondary"
                    >
                      <Star />
                    </IconButton>
                  </Tooltip>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
