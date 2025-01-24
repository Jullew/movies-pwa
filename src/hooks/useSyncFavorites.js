"use client";
import { useEffect } from "react";
import { syncFavorites } from "@/utils/syncFavorites";

const useSyncFavorites = () => {
  useEffect(() => {
    syncFavorites();

    const intervalId = setInterval(() => {
      syncFavorites();
    }, 10 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const onOnline = () => {
      console.log("Odzyskano połączenie - synchronizuję favorites...");
      syncFavorites();
    };
    window.addEventListener("online", onOnline);

    return () => window.removeEventListener("online", onOnline);
  }, []);
};

export default useSyncFavorites;
