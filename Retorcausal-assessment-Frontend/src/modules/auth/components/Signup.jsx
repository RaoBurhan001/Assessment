import { useForm } from 'react-hook-form';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signUpUserAction } from '../apiCall/AuthAction';
import { yupResolver } from '@hookform/resolvers/yup';
import SignupSchema from '../Validations/SignupValidation';

const SignUp = () => {
  const navigate = useNavigate();
  const resolver = yupResolver(SignupSchema);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: 'all', resolver, shouldFocusError: true });

  // Handles redirection to the Login page.
  const handleRedirection = () => {
    navigate('/login'); // Redirect to the Login page upon clicking "Sign Up"
  };

  // Handles form submission when the user tries to sign up.
  const onSubmit = async (data) => {
    const response = await signUpUserAction(data);

    if (response) {
      handleRedirection();
    }
    reset();
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
              {...register('name')}
              label="Name"
              type="name"
              variant="outlined"
              fullWidth
              error={!!errors.name}
              helperText={errors?.name?.message}
              margin="normal"
            />
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
              Sign Up
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SignUp;
