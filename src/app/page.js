"use client";

import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useMoviesQuery } from "@/hooks/useMoviesQuery";
import MovieResults from "@/components/MovieResults";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, isError, error } = useMoviesQuery(query);

  const handleSearch = () => {
    setQuery(searchTerm);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h4" gutterBottom>
        Wyszukiwarka filmów
      </Typography>
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

      {isLoading && <p>Ładowanie...</p>}
      {isError && (
        <p style={{ color: "red" }}>
          Błąd: {error?.message || "Nie udało się pobrać filmów"}
        </p>
      )}
      {data && <MovieResults movies={data.Search || []} />}
    </Box>
  );
}
