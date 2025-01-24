import { getFavorites, openDB } from "@/utils/indexDB";
import { fetchMovieById } from "@/services/movieService";

export async function syncFavorites() {
  if (!navigator.onLine) return;

  try {
    const favorites = await getFavorites();

    if (favorites.length === 0) return;

    const freshDataPromises = favorites.map((fav) =>
      fetchMovieById(fav.imdbID)
    );
    const freshData = await Promise.all(freshDataPromises);

    const db = await openDB();
    const tx = db.transaction("favorites", "readwrite");
    const store = tx.objectStore("favorites");

    freshData.forEach((movie) => {
      store.put(movie);
    });

    return new Promise((resolve, reject) => {
      tx.oncomplete = () => {
        console.log("Synchronizacja ulubionych zakończona pomyślnie.");
        resolve();
      };
      tx.onerror = () => {
        console.error("Transakcja IndexedDB nie powiodła się:", tx.error);
        reject(tx.error);
      };
      tx.onabort = () => {
        console.error("Transakcja IndexedDB została przerwana:", tx.error);
        reject(tx.error);
      };
    });
  } catch (error) {
    console.error("Błąd synchronizacji favorites:", error);
  }
}
