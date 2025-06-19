import { Divider, Typography } from "@mui/material";
import MainScroller from "./MainScroller";

const Featured = () => {
  return (
    <MainScroller>
      <Typography
        variant="h6"
        sx={{
          fontSize: "18px",
          fontWeight: 800,
          color: "#e33962",
          mt: { xs: "30px", md: "100px" },
        }}
      >
        FEATURED
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontSize: "36px",
          fontWeight: 800,
          color: "#fff",
          mt: 1,
        }}
      >
        CREATR{" "}
        <span style={{ fontStyle: "italic", fontWeight: "normal" }}>
          pathway
        </span>
      </Typography>
      <Divider sx={{ background: "#e33962", mr: { xs: 0, md: "300px" } }} />
    </MainScroller>
  );
};

export default Featured;
