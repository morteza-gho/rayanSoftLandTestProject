import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Alert, AlertTitle } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// services
import { SetToken, SetUserData } from '../../../services/AuthService';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = (e) => {
    e.preventDefault();

    const dataModel = {
      email, password
    };

    // TODO send dataModel to server here...

    // after get OK from server do this 
    const userData = {
      name: 'Morteza',
      family: 'QorbanAlizade',
      email
    }
    SetToken('sample_token');
    SetUserData(userData);
    navigate('/dashboard', { replace: true });

  }; // login

  return (
    <>

      <form onSubmit={(event) => login(event)}>
        <Stack spacing={3}>
          <TextField name="email" label="Email address" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />

          <TextField
            name="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <Checkbox name="remember" label="Remember me" />
          <Link variant="subtitle2" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          Login
        </LoadingButton>
      </form>
    </>
  );
}
