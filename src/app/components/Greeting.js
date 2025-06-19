"use client";
import { useAuth } from "@/context/AuthContext";
import { Typography } from "@mui/material";

const Greeting = () => {
  const { userData } = useAuth();
  const firstName = userData?.firstName;
  const lastName = userData?.lastName;
  return (
    <Typography
      variant="h3"
      sx={{
        fontWeight: "bold",
        textAlign: "center",
        m: 6,
        color: "white",
        fontSize: { xs: "40px", md: "54px" },
      }}
    >
      Welcome back,{" "}
      {firstName && lastName ? (
        <span style={{ textTransform: "uppercase" }}>
          {firstName + " " + lastName}
        </span>
      ) : (
        "Friend"
      )}
    </Typography>
  );
};

export default Greeting;
