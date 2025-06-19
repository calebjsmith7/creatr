import { Box } from "@mui/material";

const MainScroller = ({ children }) => {
  return <Box sx={{ ml: { xs: "20px", md: "300px" } }}>{children}</Box>;
};

export default MainScroller;
