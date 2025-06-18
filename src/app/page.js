"use client";
import { Typography, Stack } from "@mui/material";
import Carousel from "./components/Carousel";

import Greeting from "./components/Greeting";

export default function Home() {
  return (
    <Stack>
      <Greeting />
      <Carousel />
    </Stack>
  );
}
