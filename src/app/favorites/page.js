"use client";

import React, { useEffect, useState } from "react";
import { getFavorites, removeFavorite } from "@/utils/indexDB";
import { Typography, Button } from "@mui/material";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  // Ładujemy ulubione filmy po załadowaniu komponentu
  useEffect(() => {
    async function loadData() {
      const data = await getFavorites();
      setFavorites(data);
    }
    loadData();
  }, []);

  // Funkcja usuwania z ulubionych
  const handleRemoveFavorite = async (imdbID) => {
    try {
      await removeFavorite(imdbID);
      // Odświeżamy listę
      const data = await getFavorites();
      setFavorites(data);
    } catch (err) {
      console.error("Błąd usuwania z IndexedDB:", err);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Moje ulubione filmy
      </Typography>

      {favorites.length === 0 && <p>Brak ulubionych filmów.</p>}

      {favorites.map((movie) => (
        <div key={movie.imdbID} style={{ marginBottom: "1rem" }}>
          <Typography variant="h6">
            {movie.Title} ({movie.Year})
          </Typography>
          {/* Tu możesz dodać Poster, np. <img src={movie.Poster} ...> */}
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleRemoveFavorite(movie.imdbID)}
            style={{ marginTop: "0.5rem" }}
          >
            Usuń z ulubionych
          </Button>
        </div>
      ))}
    </div>
  );
}
