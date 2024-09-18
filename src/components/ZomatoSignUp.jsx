import { Panel } from "rsuite";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Button, Divider, Stack } from "rsuite";
import FloatingLabelInput from "./FloatingLabelInput";
import Zomoto from "/assets/zomato-logo.png";
import ZomotoBanner from "/assets/zomota-banner.gif";
import { RegisterSchema } from "../Schema/RegisterSchema";
import "rsuite/dist/rsuite.min.css";
import OtpVerification from "../components/OtpVerication";

const ZomatoSignUp = () => {
  const [signupData, setSignupData] = useState(null); // State to store signup form data
  const [timeLeft, setTimeLeft] = useState(60);
  const [resendPass, setResendPass] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validationSchema: RegisterSchema.pick(["name", "email"]),
    onSubmit: (values) => {
      if (!showOtpVerification) {
        setSignupData(values); // Store signup data before showing OTP verification
        setShowOtpVerification(true);
        setTimeLeft(60);
        setResendPass(false);
      }
    },
  });

  const resendOtp = () => {
    setResendPass(false);
    console.log("OTP resent");
  };

  useEffect(() => {
    if (timeLeft === 0) {
      setResendPass(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleResendClick = () => {
    resendOtp();
    setTimeLeft(60);
    setResendPass(false);
  };

  const handleBackClick = () => {
    setShowOtpVerification(false);
  };

  const handleOtpSubmit = (otpValues) => {
    const combinedData = {
      ...signupData, // Include the name and email from the signup form
      otp: otpValues.otp, // Include the OTP value
    };
    console.log("Full JSON Data for API:", combinedData);
    // Now send combinedData to your API
    // Example API call:,
    // fetch('your-api-url', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(combinedData)
    // });
  };

  return (
    <Panel shaded bordered bodyFill className="auth_card">
      <img
        src={ZomotoBanner}
        className="zomato-banner"
        alt="Zomato Banner"
      />
      <div className="panel-body">
        <div className="auth_container">
          <form onSubmit={formik.handleSubmit}>
            {!showOtpVerification && (
              <div className="SingInForm-container fade-in">
                <Stack alignItems="center" justifyContent="space-between">
                  <div>
                    <h3 className="heading poppins-medium">Signup</h3>
                  </div>
                  <img className="swiggy-icon" src={Zomoto} alt="Zomato" />
                </Stack>
                <Divider className="div-25" />
                <div className="form-container">
                  <FloatingLabelInput
                    label="Full Name"
                    name="name"
                    value={formik.values.name}
                    onChange={(value) => formik.setFieldValue("name", value)}
                    onBlur={formik.handleBlur}
                    error={formik.errors.name}
                    touched={formik.touched.name}
                  />
                  <FloatingLabelInput
                    label="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={(value) => formik.setFieldValue("email", value)}
                    onBlur={formik.handleBlur}
                    error={formik.errors.email}
                    touched={formik.touched.email}
                  />
                </div>
                <Button type="submit" className="btn" block>
                  Create account
                </Button>
                <p className="text-center action-text poppins-regular">
                  Already have an account? &nbsp;
                  <a href="#" className="active cta">
                    Login
                  </a>
                </p>
              </div>
            )}
            <OtpVerification
              onSubmit={handleOtpSubmit}
              resendPass={resendPass}
              handleResendClick={handleResendClick}
              timeLeft={timeLeft}
              showOtpVerification={showOtpVerification}
              handleBackClick={handleBackClick}
            />
          </form>
        </div>
      </div>
    </Panel>
  );
};

export default ZomatoSignUp;
