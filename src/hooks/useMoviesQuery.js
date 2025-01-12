"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "@/services/moviesService";

export default function useMoviesQuery(query) {
  // Kluczem będzie ["movies", query].
  return useQuery({
    queryKey: ["movies", query],
    queryFn: () => fetchMovies(query),
    enabled: !!query,
  });
}
