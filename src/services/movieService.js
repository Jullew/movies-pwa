import axios from "axios";
export async function fetchMovies(query) {
  if (!query) return { Search: [] };

  const res = await axios.get(`/api/movies?query=${encodeURIComponent(query)}`);
  if (!res.ok) {
    throw new Error("Błąd pobierania filmów z /api/movies");
  }
  // OMDb zwraca obiekt np. { Search: [...], totalResults: "...", ... }
  return res.json();
}

export async function fetchMovieById(id) {
  if (!id) throw new Error("Brak ID");
  const res = await fetch(`/api/movie?id=${encodeURIComponent(id)}`);
  if (!res.ok) {
    throw new Error("Błąd pobierania detali filmu");
  }
  return res.json(); // np. { Title, Year, imdbID, Poster, Plot, ... }
}
