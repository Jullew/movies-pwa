"use client";

import React from "react";
import { Button } from "@mui/material";
import Link from "next/link";
import { addFavorite } from "@/utils/indexDB";

export default function MovieResults({ movies }) {
  const handleAddFavorite = async (movie) => {
    try {
      await addFavorite(movie);
      alert(`Dodano do ulubionych: ${movie.Title}`);
    } catch (err) {
      console.error("Błąd zapisu do IndexedDB:", err);
    }
  };

  if (!movies || movies.length === 0) {
    return <p>Brak wyników do wyświetlenia.</p>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <div key={movie.imdbID} style={{ marginBottom: "1rem" }}>
          <strong>{movie.Title}</strong> ({movie.Year})<br />
          {movie.Poster && movie.Poster !== "N/A" && (
            <img
              src={movie.Poster}
              alt={movie.Title}
              style={{ maxWidth: "100px", marginTop: "0.5rem" }}
            />
          )}
          <br />
          <Link href={`/movie/${movie.imdbID}`} passHref>
            <Button variant="outlined" style={{ marginRight: "0.5rem" }}>
              Szczegóły
            </Button>
          </Link>
          <Button variant="contained" onClick={() => handleAddFavorite(movie)}>
            Dodaj do ulubionych
          </Button>
        </div>
      ))}
    </div>
  );
}
