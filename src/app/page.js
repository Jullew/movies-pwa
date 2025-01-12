"use client";

import { useState, useEffect } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useMoviesQuery } from "@/hooks/useMoviesQuery";
import MovieResults from "@/components/MovieResults";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedQuery = sessionStorage.getItem("searchQuery");
    if (savedQuery) {
      setQuery(savedQuery);
      setSearchTerm(savedQuery);
    }
  }, []);

  const { data, isLoading, isError, error } = useMoviesQuery(query);

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      setQuery(searchTerm);
      sessionStorage.setItem("searchQuery", searchTerm);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: "100%",
        maxWidth: "1600px",
        margin: "auto",
        padding: "2rem",
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Wyszukiwarka Filmów
      </Typography>

      <Box
        display="flex"
        flexDirection="row"
        gap={2}
        sx={{
          width: "100%",
          maxWidth: "600px",
          marginBottom: "1.5rem",
        }}
      >
        <TextField
          label="Wpisz tytuł filmu"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onKeyDown={handleKeyDown}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch}>
          Szukaj
        </Button>
      </Box>

      {isLoading && <Typography>Ładowanie...</Typography>}
      {isError && (
        <Typography color="error">
          Błąd: {error?.message || "Nie udało się pobrać filmów"}
        </Typography>
      )}

      {data?.Search?.length > 0 && <MovieResults movies={data.Search} />}
    </Box>
  );
}
