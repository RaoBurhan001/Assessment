import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  getUserByIdAction,
  updateUserAction,
  getCountriesAction,
  getStatesByCountryIdAction,
  getCitiesByStateIdAction,
} from '../apiCall/UserAction'; // You should have an API call for updating a user
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
} from '@mui/material';
import Select from 'react-select'; // Import react-select
import { useForm } from 'react-hook-form';
import UserSchema from '../Validation/Validation';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const resolver = yupResolver(UserSchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ mode: 'all', resolver, shouldFocusError: true }); // Change the mode to 'onBlur' for validation

  const [cities, setCities] = useState([]);
  const [city, setCity] = useState();
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState();
  const [states, setStates] = useState([]);
  const [state, setState] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  // Fetch user data by ID
  const getUserData = async () => {
    const response = await getUserByIdAction(id);
    if (response) {
      setValue('name', response.name);
      setName(response.name);
      setValue('email', response.email);
      setEmail(response.email);
      setCountry({
        value: response.country_id?._id,
        label: response.country_id?.name,
      });
      setValue('country_id', response.country_id?._id);
      setState({
        value: response.state_id?._id,
        label: response.state_id?.name,
      });
      setValue('state_id', response.state_id?._id);
      setCity({
        value: response.city_id?._id,
        label: response.city_id?.name,
      });
      setValue('city_id', response.city_id?._id);
    }
  };

  // Fetch the list of countries
  const getCountries = async () => {
    const response = await getCountriesAction();

    if (response) {
      setCountries(response);
    }
  };

  // Fetch states by selected country
  const getStatesByCountryId = async (countryId) => {
    const response = await getStatesByCountryIdAction(countryId);

    if (response) {
      setStates(response);
    }
  };
  // Fetch cities by selected state
  const getCitiesByStateId = async (stateId) => {
    const response = await getCitiesByStateIdAction(stateId);

    if (response) {
      setCities(response);
    }
  };
  useEffect(() => {
    getUserData();
    getCountries();
  }, []);

  // Handle form submission
  const onSubmit = async (data) => {
    // Send the updated user data to your API for updating the user
    const response = await updateUserAction(id, data); // You should create this function in your API calls
    if (response) {
      navigate('/listing');
    }
  };

  // Handle country selection
  const onCountryChange = (e) => {
    setValue('country_id', e.value);
    setCountry(e);
    getStatesByCountryId(e.value);
  };
  // Handle state selection
  const onStateChange = (e) => {
    setValue('state_id', e.value);
    setState(e);
    getCitiesByStateId(e.value);
  };
  // Handle city selection
  const onCityChange = (e) => {
    setValue('city_id', e.value);
    setCity(e);
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
        xs={6}
        sm={8}
        md={8}
        lg={8}
        justifyContent="center"
        alignItems="center"
      >
        <Paper elevation={3} style={{ padding: '20px' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h5" align="center" gutterBottom>
              Update User
            </Typography>
            <TextField
              {...register('name')}
              label="Name"
              type="text"
              variant="outlined"
              fullWidth
              error={!!errors.name}
              helperText={errors.name && errors.name.message}
              defaultValue={name}
              style={{ marginBottom: '1rem' }} // Add margin to the bottom
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              {...register('email')}
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              error={!!errors.email}
              helperText={errors.email && errors.email.message}
              defaultValue={email}
              style={{ marginBottom: '1rem' }} // Add margin to the bottom
              InputLabelProps={{ shrink: true }}
            />
            <FormControl fullWidth>
              <Select
                placeholder={'Country'}
                {...register('country_id')}
                style={{ marginBottom: '2rem' }} // Add margin to the bottom
                options={countries?.map((country) => ({
                  label: country?.name,
                  value: country?._id,
                }))}
                value={
                  country
                    ? { label: country.label, value: country.value }
                    : null
                }
                onChange={onCountryChange}
                styles={{
                  // You can customize the styles here
                  control: (provided, city) => ({
                    ...provided,
                    width: '100%', // Set the desired width
                    padding: '10px', // Add padding
                    marginBottom: '10px', // Add padding
                  }),
                  // Add more style overrides if needed
                }}
              />
            </FormControl>
            {errors?.country_id?.message && (
              <div className="alert alert-danger d-flex align-items-center p-3 mt-3 mb-0">
                <div className="d-flex flex-column">
                  <span color>{errors?.country_id?.message}</span>
                </div>
              </div>
            )}

            <FormControl fullWidth>
              <Select
                {...register('state_id')}
                placeholder={'State'}
                options={states?.map((state) => ({
                  label: state?.name,
                  value: state?._id,
                }))}
                value={
                  state ? { label: state.label, value: state.value } : null
                }
                onChange={onStateChange} // Handle value change
                error={!!errors.state}
                helperText={errors.state && errors.state.message}
                styles={{
                  // You can customize the styles here
                  control: (provided, city) => ({
                    ...provided,
                    width: '100%', // Set the desired width
                    padding: '10px', // Add padding
                    marginBottom: '10px', // Add padding
                  }),
                  // Add more style overrides if needed
                }}
              />
            </FormControl>
            {errors?.state_id?.message && (
              <div className="alert alert-danger d-flex align-items-center p-3 mt-3 mb-0">
                <div className="d-flex flex-column">
                  <span color>{errors?.state_id?.message}</span>
                </div>
              </div>
            )}
            <FormControl fullWidth>
              <Select
                {...register('city_id')}
                placeholder={'City'}
                variant="outlined"
                options={cities?.map((city) => ({
                  label: city?.name,
                  value: city?._id,
                }))}
                value={city ? { label: city.label, value: city.value } : null}
                onChange={onCityChange} // Handle value change
                error={!!errors.city}
                helperText={errors.city && errors.city.message}
                styles={{
                  // You can customize the styles here
                  control: (provided, city) => ({
                    ...provided,
                    width: '100%', // Set the desired width
                    padding: '10px', // Add padding
                    margin: '0px', // Add padding
                  }),
                }}
              />
            </FormControl>
            {errors?.city_id?.message && (
              <div className="alert alert-danger d-flex align-items-center p-3 mt-3 mb-0">
                <div className="d-flex flex-column">
                  <span color>{errors?.city_id?.message}</span>
                </div>
              </div>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: '20px' }}
            >
              Update
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default EditUser;
