export async function fetchMovies(query) {
  if (!query) return { Search: [] };

  const res = await fetch(`/api/movies?query=${encodeURIComponent(query)}`);
  if (!res.ok) {
    throw new Error("Błąd pobierania filmów z /api/movies");
  }
  // OMDb zwraca obiekt np. { Search: [...], totalResults: "...", ... }
  return res.json();
}
