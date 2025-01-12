import axios from "axios";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response(JSON.stringify({ error: "Missing id param" }), {
      status: 400,
    });
  }

  try {
    const apiKey = process.env.OMDB_API_KEY; // w .env.local
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${encodeURIComponent(
      id
    )}&plot=full`;
    const { data } = await axios.get(url);

    // data => np. { Title, Year, Plot, ... }
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Błąd fetch z OMDb:", error);
    return new Response(JSON.stringify({ error: "Błąd serwera" }), {
      status: 500,
    });
  }
}
