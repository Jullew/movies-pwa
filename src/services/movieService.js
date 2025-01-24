import axios from "axios";

export async function fetchMovies(query) {
  if (!query) return { Search: [] };

  try {
    const res = await axios.get(
      `/api/movies?query=${encodeURIComponent(query)}`
    );

    if (!res.data.Search || res.data.error) {
      throw new Error(res.data.error || "Nie znaleziono filmów");
    }

    return res.data;
  } catch (error) {
    console.error("Błąd pobierania filmów:", error);
    throw new Error("Nie udało się pobrać filmów. Spróbuj ponownie.");
  }
}

export async function fetchMovieById(id) {
  if (!id) throw new Error("Brak ID");

  try {
    const res = await axios.get(`/api/movie?id=${encodeURIComponent(id)}`);

    if (!res.data || res.data.Response === "False") {
      throw new Error(res.data.Error || "Nie znaleziono szczegółów filmu");
    }

    return res.data;
  } catch (error) {
    console.error("Błąd pobierania detali filmu:", error);
    throw new Error("Nie udało się pobrać szczegółów filmu. Spróbuj ponownie.");
  }
}
