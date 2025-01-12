"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMovies, fetchMovieById } from "@/services/movieService";

export function useMoviesQuery(query) {
  return useQuery({
    queryKey: ["movies", query],
    queryFn: () => fetchMovies(query),
    enabled: !!query,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    onError: (error) => {
      console.error("Błąd zapytania do API filmów:", error);
    },
  });
}

export function useMovieQuery(id) {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => fetchMovieById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}
