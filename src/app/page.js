import { Typography, Stack } from "@mui/material";
import Carousel from "./components/Carousel";

export default function Home() {
  return (
    <Stack>
      <Carousel />
      <Typography>Hello World</Typography>
    </Stack>
  );
}
