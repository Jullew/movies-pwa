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
 * Dodawanie lub aktualizacja obiektu "movie" w store "favorites".
 * @param {Object} movie - np. { imdbID, Title, Year, Poster, ... }
 */
export async function addFavorite(movie) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("favorites", "readwrite");
    const store = tx.objectStore("favorites");
    const req = store.put(movie);

    req.onsuccess = () => {
      resolve();
    };
    req.onerror = (e) => {
      reject(e.target.error);
    };
  });
}

/**
 * Pobieranie filmów z "favorites".
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

/**
 * Aktualizacja (lub dodanie, jeśli nie istnieje) obiektu "movie" w store "favorites".
 * Kluczem jest "imdbID".
 */
export async function updateFavorite(movie) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("favorites", "readwrite");
    const store = tx.objectStore("favorites");
    const req = store.put(movie);

    req.onsuccess = () => {
      resolve();
    };
    req.onerror = (e) => {
      reject(e.target.error);
    };
  });
}

/**
 * Pobranie pojedynczego filmu z "favorites" po imdbID.
 * @param {string} imdbID
 * @returns {Promise<Object|null>} Zwraca obiekt filmu lub null,
 * jeśli takiego imdbID nie ma w bazie.
 */
export async function getFavoriteById(imdbID) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("favorites", "readonly");
    const store = tx.objectStore("favorites");
    const req = store.get(imdbID);

    req.onsuccess = (e) => {
      resolve(e.target.result);
    };
    req.onerror = (e) => {
      reject(e.target.error);
    };
  });
}
