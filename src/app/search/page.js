"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import useMoviesQuery from "@/hooks/useMoviesQuery";
import { Typography, Button } from "@mui/material";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const { data, isLoading, isError, error } = useMoviesQuery(query);

  // data => np. { Search: [...], Response: "True", totalResults: "..., Error: "..." }
  const movies = data?.Search || [];

  if (isLoading) {
    return <p>Ładowanie filmów...</p>;
  }

  if (isError) {
    return <p>Błąd: {error.message}</p>;
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Wyniki wyszukiwania: {query}
      </Typography>
      {movies.length === 0 && <p>Brak wyników.</p>}

      {movies.map((movie) => (
        <div key={movie.imdbID} style={{ marginBottom: "1rem" }}>
          <strong>{movie.Title}</strong> ({movie.Year})
          <br />
          {movie.Poster && movie.Poster !== "N/A" && (
            <img
              src={movie.Poster}
              alt={movie.Title}
              style={{ maxWidth: "100px", marginTop: "0.5rem" }}
            />
          )}
          <br />
          <Button variant="outlined" style={{ marginTop: "0.5rem" }}>
            Dodaj do ulubionych
          </Button>
        </div>
      ))}
    </div>
  );
}
