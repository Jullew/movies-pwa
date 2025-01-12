// utils/indexedDB.js

/**
 * Tworzenie/otwieranie bazy "moviesDB" w IndexedDB.
 * Tworzenie obiektu store "favorites" (kluczem jest imdbID).
 */

export function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("moviesDB", 1);

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains("favorites")) {
        db.createObjectStore("favorites", { keyPath: "imdbID" });
      }
    };

    request.onsuccess = (e) => {
      resolve(e.target.result);
    };

    request.onerror = (e) => {
      reject(e.target.error);
    };
  });
}

/**
 * Dodawawanie obiektu "movie" do store "favorites".
 * @param {Object} movie - np. { imdbID, Title, Year, Poster, ... }
 */
export async function addFavorite(movie) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("favorites", "readwrite");
    const store = tx.objectStore("favorites");
    const req = store.add(movie);

    req.onsuccess = () => {
      resolve();
    };
    req.onerror = (e) => {
      reject(e.target.error);
    };
  });
}

/**
 * Pobieranie filmó z "favorites".
 * @returns {Promise<Array>} tablica obiektów filmów
 */
export async function getFavorites() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("favorites", "readonly");
    const store = tx.objectStore("favorites");
    const req = store.getAll();

    req.onsuccess = (e) => {
      resolve(e.target.result);
    };
    req.onerror = (e) => {
      reject(e.target.error);
    };
  });
}

/**
 * Usuwanie filmu z ulubionych (po imdbID).
 * @param {string} imdbID
 */
export async function removeFavorite(imdbID) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("favorites", "readwrite");
    const store = tx.objectStore("favorites");
    const req = store.delete(imdbID);

    req.onsuccess = () => resolve();
    req.onerror = (e) => reject(e.target.error);
  });
}
