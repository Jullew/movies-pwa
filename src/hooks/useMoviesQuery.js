"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMovies, fetchMovieById } from "@/services/movieService";

export function useMoviesQuery(query) {
  return useQuery({
    queryKey: ["movies", query],
    queryFn: () => fetchMovies(query),
    enabled: !!query,
  });
}

export function useMovieQuery(id) {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => fetchMovieById(id),
    enabled: !!id,
  });
}
