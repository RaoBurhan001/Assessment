import * as Yup from 'yup';

/**   CompanySchema validation functionality */
const LoginSchema = Yup.object().shape({

  password: Yup.string().required(
    "Password is required"
  ),
  email: Yup.string()
    .required( "Email is required")
    .email('Invalid Format'),
});

export default LoginSchema;
