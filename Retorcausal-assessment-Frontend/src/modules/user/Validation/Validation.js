import * as Yup from 'yup';

/**   CompanySchema validation functionality */
const UserSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().required('Email is required').email('Invalid Format'),
  country_id: Yup.string().required('Country is required'),
  city_id: Yup.string().required('City is required'),
  state_id: Yup.string().required('State is required'),
});

export default UserSchema;
