import * as Yup from 'yup';

/**   CompanySchema validation functionality */
const LoginSchema = Yup.object().shape({

  password: Yup.string().required(
    "Password is required"
  ),
  // trading_name: Yup.string()
  // owner: Yup.string()
  // abn: Yup.string()
  // acn: Yup.string()
  email: Yup.string()
    .required( "Email is required")
    .email('Invalid Format'),
});

export default LoginSchema;
