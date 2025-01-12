"use client";

import React from "react";
import { useParams } from "next/navigation";
import useMovieQuery from "@/hooks/useMovieQuery";
import { Button, Typography } from "@mui/material";
import { addFavorite, removeFavorite, getFavorites } from "@/utils/indexedDB"; // lub services

export default function MovieDetailsPage() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useMovieQuery(id);

  const handleAddFavorite = async () => {
    if (data) {
      await addFavorite(data);
      alert(`Dodano do ulubionych: ${data.Title}`);
    }
  };

  const handleRemoveFavorite = async () => {
    if (data) {
      await removeFavorite(data.imdbID);
      alert(`Usunięto z ulubionych: ${data.Title}`);
    }
  };

  if (isLoading) return <p>Wczytywanie...</p>;
  if (isError) return <p>Błąd: {error.message}</p>;
  if (!data) return <p>Nie znaleziono filmu.</p>;

  // data = szczegóły filmu { Title, Year, Poster, Plot, ... }
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {data.Title}
      </Typography>
      <p>Rok: {data.Year}</p>
      <p>Gatunek: {data.Genre}</p>
      <p>Reżyser: {data.Director}</p>
      <p>Opis: {data.Plot}</p>
      {data.Poster && data.Poster !== "N/A" && (
        <img
          src={data.Poster}
          alt={data.Title}
          style={{ maxWidth: "200px", marginBottom: "1rem" }}
        />
      )}
      <div style={{ marginTop: "1rem" }}>
        <Button
          variant="contained"
          onClick={handleAddFavorite}
          style={{ marginRight: "0.5rem" }}
        >
          Dodaj do ulubionych
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleRemoveFavorite}
        >
          Usuń z ulubionych
        </Button>
      </div>
    </div>
  );
}
