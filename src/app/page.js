"use client";

import { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useMoviesQuery } from "@/hooks/useMoviesQuery";
import MovieResults from "@/components/MovieResults";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const { data, isLoading, isError, error } = useMoviesQuery(query);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    setQuery(searchTerm);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Wyszukiwarka filmów
      </Typography>
      {/* Pole wyszukiwania */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <TextField
          label="Wpisz tytuł filmu"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch}>
          Szukaj
        </Button>
      </div>

      {/* Tu, w tym samym komponencie, wyświetlamy wyniki */}
      {isLoading && <p>Ładowanie...</p>}
      {isError && <p>Błąd: {error.message}</p>}
      {data && <MovieResults movies={data.Search || []} />}
    </div>
  );
}
