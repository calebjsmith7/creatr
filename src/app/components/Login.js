import { useState } from 'react';
import {
  Box,
  Button,
  FormControlLabel,
  Paper,
  Switch,
  TextField,
  Typography
} from '@mui/material';

export default function Login({ logo }) {
  const [isRegister, setIsRegister] = useState(false);

  const handleToggle = () => setIsRegister((prev) => !prev);

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: '#f5f5f5',
      p: 2,
    }}>
      <Paper elevation={3} sx={{ p: 4, width: 360 }}>
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          {logo}
        </Box>
        <Typography variant="h5" component="h1" sx={{ mb: 2 }}>
          {isRegister ? 'Register' : 'Login'}
        </Typography>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {isRegister && <TextField label="Name" fullWidth />}
          <TextField label="Email" type="email" fullWidth />
          <TextField label="Password" type="password" fullWidth />
          {isRegister && <TextField label="Confirm Password" type="password" fullWidth />}
          <Button variant="contained" color="primary">
            {isRegister ? 'Register' : 'Login'}
          </Button>
        </Box>
        <FormControlLabel
          control={<Switch checked={isRegister} onChange={handleToggle} />}
          label={isRegister ? 'Have an account? Login' : "Don't have an account? Register"}
          sx={{ mt: 2 }}
        />
      </Paper>
    </Box>
  );
}
