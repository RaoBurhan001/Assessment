import * as Yup from 'yup';

/**   CompanySchema validation functionality */
const SignupSchema = Yup.object().shape({
  name: Yup.string().required(
  "Name is required"
  ),
  password: Yup.string().required(
    "Password is required"
  ),
  email: Yup.string()
    .required( "Email is required")
    .email('Invalid Format'),
});

export default SignupSchema;
