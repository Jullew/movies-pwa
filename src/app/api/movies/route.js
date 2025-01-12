import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Metoda niedozwolona" });
  }

  const { query } = req.query;
  const API_KEY = process.env.OMDB_API_KEY;

  if (!query) {
    return res.status(400).json({ error: "Brak zapytania w parametrach" });
  }

  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(
    query
  )}`;

  try {
    const response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Błąd przy pobieraniu filmów:", error);
    res.status(500).json({ error: "Błąd serwera" });
  }
}
