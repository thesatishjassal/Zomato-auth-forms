import * as Yup from 'yup';

const RegisterSchema = Yup.object({
  phonenumber: Yup.string()
    .required('Phone Number is required')
    .matches(/^[0-9]+$/, 'Phone Number must be numeric')
    .min(10, 'Phone Number must be at least 10 digits')
    .max(15, 'Phone Number must be at most 15 digits'),
  name: Yup.string()
    .required('Name is required'),
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),
  referralcode: Yup.string(),
  otp: Yup.string()
    .when('showOtpVerification', {
      is: true,
      then: Yup.string().required('OTP is required')
    })
});

export default RegisterSchema;
