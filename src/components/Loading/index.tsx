// @ts-nocheck
import { Box, CircularProgress } from "@mui/material";
import React from "react";

export default function LoadingComponent({ size = 40, color = "primary" }) {
  return (
    <Box style={{ height: '100%', width: '100%', display: 'grid', placeItems: 'center' }}>
      <CircularProgress size={size} color={color} />
    </Box>
  )
}