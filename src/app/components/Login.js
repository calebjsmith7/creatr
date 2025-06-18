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
      // if result.status === "signedIn", the context will swap to the protected UI
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
        bgcolor: "#f5f5f5",
        p: 2,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: 360 }}>
        <Box sx={{ textAlign: "center", mb: 2 }}>{logo}</Box>
        <Typography variant="h5" component="h1" sx={{ mb: 2 }}>
          {isRegister ? "Register" : "Login"}
        </Typography>
        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSubmitting || !email}
          >
            {isSubmitting
              ? "Sending Email Link..."
              : isRegister
              ? "Register"
              : "Login"}
          </Button>
        </Box>
        <FormControlLabel
          control={<Switch checked={isRegister} onChange={handleToggle} />}
          label={
            isRegister
              ? "Have an account? Login"
              : "Don't have an account? Register"
          }
          sx={{ mt: 2 }}
        />
      </Paper>
    </Box>
  );
}
