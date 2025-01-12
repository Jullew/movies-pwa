import axios from "axios";
export async function fetchMovies(query) {
  if (!query) return { Search: [] };

  try {
    const res = await axios.get(
      `/api/movies?query=${encodeURIComponent(query)}`
    );

    if (res.data.Response === "False") {
      throw new Error(res.data.Error || "Nie znaleziono filmów");
    }

    return res.data;
  } catch (error) {
    console.error("Błąd pobierania filmów:", error);
    throw new Error("Nie udało się pobrać filmów. Spróbuj ponownie.");
  }
}

export async function fetchMovieById(id) {
  if (!id) throw new Error("Brak ID");
  const res = await fetch(`/api/movie?id=${encodeURIComponent(id)}`);
  if (!res.ok) {
    throw new Error("Błąd pobierania detali filmu");
  }
  return res.json(); // np. { Title, Year, imdbID, Poster, Plot, ... }
}
