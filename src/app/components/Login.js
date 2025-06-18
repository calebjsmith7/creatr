import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Box,
  Button,
  FormControlLabel,
  Paper,
  Switch,
  TextField,
  Typography,
  Alert,
} from "@mui/material";

export default function Login({ logo }) {
  const [isRegister, setIsRegister] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const { signIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setIsSubmitting(true);

    try {
      const result = await signIn(email);
      if (result.status === "linkSent") {
        setMessage(
          `✅ Check ${email} for your login link. It may take a minute to arrive.`
        );
        setEmail("");
      }
    } catch (err) {
      console.error(err);
      setError("❌ Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggle = () => setIsRegister((prev) => !prev);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#1d1d1e",
        background: "url(/peoplebg.jpg)",
        backgroundSize: "cover",
        p: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mr: 4 }}>
        <img
          src="/creatr-logo-wht.png"
          alt="Logo"
          style={{ maxWidth: "930px", height: 40 }}
        />
      </Box>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: 360,
          bgcolor: "#2c2c2e",
          color: "white",
          borderRadius: 5,
        }}
      >
        <Box sx={{ textAlign: "center", mb: 2 }}>{logo}</Box>
        <Typography variant="h5" component="h1" sx={{ mb: 2, color: "white" }}>
          {isRegister ? "Register" : "Login"}
        </Typography>

        {message && (
          <Alert severity="success" sx={{ bgcolor: "#333", color: "white" }}>
            {message}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ bgcolor: "#333", color: "white" }}>
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="filled"
            InputLabelProps={{ style: { color: "#bbb" } }}
            InputProps={{
              style: { color: "white", backgroundColor: "#3a3a3c" },
            }}
          />

          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: "#e33962",
              color: "white",
              "&:hover": { backgroundColor: "#c02b53" },
            }}
          >
            {isSubmitting
              ? "Sending Email Link..."
              : isRegister
              ? "Register"
              : "Login"}
          </Button>
        </Box>

        <FormControlLabel
          control={
            <Switch
              checked={isRegister}
              onChange={handleToggle}
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": { color: "#e33962" },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#e33962",
                },
              }}
            />
          }
          label={
            isRegister
              ? "Have an account? Login"
              : "Don't have an account? Register"
          }
          sx={{ mt: 2, color: "white" }}
        />
      </Paper>
    </Box>
  );
}
