"use client";

import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import { NotificationsActive } from "@mui/icons-material";
import theme from "@/theme";

/**
 * Komponent, który po załadowaniu od razu wyświetla toasta z przyciskiem
 * "Włącz powiadomienia PUSH" na górze ekranu, na 10 sekund.
 */
export default function EnablePushToast() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Wyświetlamy toasta jednorazowo po montowaniu komponentu
    const toastId = toast(
      (t) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <NotificationsActive />
          <Button
            variant="contained"
            style={{ background: theme.palette.primary.main, color: "white" }}
            onClick={() => {
              // Po kliknięciu przycisku usuwamy toasta...
              toast.dismiss(t.id);
              // ...i dopiero wtedy zaczynamy subskrypcję
              askPermissionAndSubscribe(t.id);
            }}
            disabled={isLoading}
          >
            {isLoading ? "Trwa włączanie..." : "Włącz powiadomienia PUSH"}
          </Button>
        </div>
      ),
      {
        duration: 10000, // 10 sekund
        position: "top-center",
      }
    );

    // Opcjonalnie: jeśli chcesz, żeby toast zniknął na odmontowanie:
    return () => {
      toast.dismiss(toastId);
    };
  }, [isLoading]);

  async function askPermissionAndSubscribe(toastId) {
    toast.dismiss(toastId);

    // setIsLoading(true);
    // try {
    //   if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    //     toast.error("Twoja przeglądarka nie wspiera powiadomień PUSH.");
    //     return;
    //   }
    //   const permission = await Notification.requestPermission();
    //   if (permission !== "granted") {
    //     toast.error("Nie udzielono zgody na powiadomienia.");
    //     return;
    //   }
    //   const swRegistration = await navigator.serviceWorker.ready;

    //   const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_KEY;
    //   const convertedKey = urlBase64ToUint8Array(vapidPublicKey);

    //   const subscription = await swRegistration.pushManager.subscribe({
    //     userVisibleOnly: true,
    //     applicationServerKey: convertedKey,
    //   });

    //   const response = await fetch("/api/saveSubscription", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ subscription }),
    //   });

    //   if (response.ok) {
    //     toast.success("Powiadomienia włączone. Subskrypcja zapisana!");
    //   } else {
    //     toast.error("Błąd podczas zapisywania subskrypcji.");
    //   }
    // } catch (error) {
    //   console.error("Błąd subskrypcji:", error);
    //   toast.error("Błąd podczas włączania powiadomień.");
    // } finally {
    //   setIsLoading(false);
    // }
  }

  return null;
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
