"use client";

import { useEffect } from "react";

export default function SWRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(() => console.log("[SWRegister] Service Worker zarejestrowany"))
        .catch((err) =>
          console.error("[SWRegister] Błąd rejestracji SW:", err)
        );
    }
  }, []);

  return null;
}
