import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  const API_KEY = process.env.OMDB_API_KEY;

  if (!query) {
    return NextResponse.json(
      { error: "Brak zapytania w parametrach" },
      { status: 400 }
    );
  }

  try {
    // Pobranie listy filmów
    const searchUrl = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(
      query
    )}`;
    const searchResponse = await axios.get(searchUrl);

    if (!searchResponse.data.Search) {
      return NextResponse.json(
        { error: "Nie znaleziono filmów" },
        { status: 404 }
      );
    }

    // Pobranie pełnych szczegółów dla pierwszych 10 filmów
    const searchResults = searchResponse.data.Search.slice(0, 10);
    const fullDetailsPromises = searchResults.map(async (movie) => {
      const detailsUrl = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}&plot=full`;
      const detailsResponse = await axios.get(detailsUrl);
      return detailsResponse.data;
    });

    const fullDetails = await Promise.all(fullDetailsPromises);

    return NextResponse.json({ Search: fullDetails }, { status: 200 });
  } catch (error) {
    console.error("Błąd pobierania filmów:", error);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
