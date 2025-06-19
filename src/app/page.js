"use client";
import { Typography, Stack } from "@mui/material";
import Carousel from "./components/Carousel";
import Featured from "./components/Featured";
import Greeting from "./components/Greeting";

export default function Home() {
  return (
    <Stack sx={{ pb: 20 }}>
      <Greeting />
      <Carousel />
      <Featured />
    </Stack>
  );
}
