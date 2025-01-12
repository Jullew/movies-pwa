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

  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(
    query
  )}`;

  try {
    const response = await axios.get(url);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Błąd przy pobieraniu filmów:", error);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
