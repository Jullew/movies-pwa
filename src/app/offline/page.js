"use client";
import theme from "@/theme";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
export default function OfflinePage() {
  const router = useRouter();
  return (
    <Box
      style={{
        display: "flex",
        justifyItems: "center",
        alignItems: "center",
        width: "100vw",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <Typography>Błąd połączenia z siecią...</Typography>
      <Button
        style={{ background: theme.palette.secondary.main, color: "white" }}
        onClick={router.push("/")}
      >
        Powrót do ekranu głównego
      </Button>
    </Box>
  );
}
