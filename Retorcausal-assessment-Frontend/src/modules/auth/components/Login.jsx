import { useForm } from 'react-hook-form';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginUserAction } from '../apiCall/AuthAction';
import { yupResolver } from '@hookform/resolvers/yup';
import LoginSchema from '../Validations/LoginValidation';

const Login = () => {
  const navigate = useNavigate();
  const resolver = yupResolver(LoginSchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: 'all', resolver, shouldFocusError: true });
  /**  here we handle submit on create and update  */
  const onSubmit = async (data) => {
    const response = await loginUserAction(data);
    if (response) {
      /** set access token in local storage */
      // localStorage.setItem('accessToken', response.token);
      handleRedirection();
    }
    reset();
  };
  // ...
  const handleRedirection = () => {
    /** redirect to the home */
    navigate('/listing');
  };

  const handleSignUpClick = () => {
    // Redirect to the desired URL upon clicking "Sign Up"
    navigate('/signup');
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid
        item
        xs={10}
        sm={6}
        md={4}
        lg={4}
        justifyContent="center"
        alignItems="center"
      >
        <Paper elevation={3} style={{ padding: '20px' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h5" align="center" gutterBottom>
              Retrocausal
            </Typography>

            <TextField
              {...register('email')}
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              error={!!errors.email}
              helperText={errors?.email?.message}
              margin="normal"
            />

            <TextField
              {...register('password')}
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              error={!!errors.password}
              helperText={errors?.password?.message}
              margin="normal"
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: '20px' }}
            >
              Sign In
            </Button>

            <Button
              variant="contained"
              color="secondary"
              fullWidth
              style={{ marginTop: '10px' }}
              onClick={handleSignUpClick}
            >
              Sign Up
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default Login;
