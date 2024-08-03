import { Panel } from "rsuite";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Button, Divider, Stack } from "rsuite";
import FloatingLabelInput from "./FloatingLabelInput";
import ArowBackIcon from "@rsuite/icons/ArowBack";
import MessageIcon from "@rsuite/icons/Message";
import Zomoto from "../assets/zomato-logo.png";
import EmailFillIcon from "@rsuite/icons/EmailFill";

import "rsuite/dist/rsuite.min.css";

const ZomatoSignUp = () => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [resendPass, setResendPass] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      otp: "",
    },
    onSubmit: (values) => {
      if (!showOtpVerification) {
        setShowOtpVerification(true);
      } else {
        console.log("OTP Verified:", values);
      }
    },
  });

  const resendOtp = async () => {
    console.log("Resending OTP...");
    // return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      setResendPass(true);
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const handleResendClick = async () => {
    try {
      await resendOtp();
      setTimeLeft(30);
      setResendPass(false);
    } catch (error) {
      console.error("Error resending OTP:", error);
    }
  };

  const handleBackClick = () => {
    setShowOtpVerification(false);
  };

  return (
    <Panel shaded bordered bodyFill className="auth_card">
      <img
        src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/967f19111202195.5ffdfc0e915cb.gif"
        className="zomato-banner"
      />
      <div className="panel-body">
        <div className="auth_container">
          <form onSubmit={formik.handleSubmit}>
            <div
              className={`SingInForm-container ${
                showOtpVerification ? "fade-out" : "fade-in"
              }`}
              style={{ display: showOtpVerification ? "none" : "block" }}
            >
              {" "}
              <Stack alignItems="center" justifyContent="space-between">
                <div>
                  <h3 className="heading poppins-medium">Signup</h3>
                </div>
                <img className="swiggy-icon" src={Zomoto} alt="Swiggy" />
              </Stack>
              <Divider className="div-25" />
              <div className="form-container">
                <FloatingLabelInput
                  label="Full Name"
                  name="FullName"
                  value={formik.values.name}
                  onChange={(value) =>
                    formik.setFieldValue("name", value)
                  }
                />
                <FloatingLabelInput
                  label="Email"
                  name="Email"
                  value={formik.values.email}
                  onChange={(value) =>
                    formik.setFieldValue("email", value)
                  }
                />
              </div>
              <Button type="submit" className="btn" block>
                Create account
              </Button>
              <p className="text-center action-text poppins-regular">
                Already have a account? &nbsp;
                <a href="" className="active cta">
                  Login
                </a>
              </p>
            </div>
            <div
              className={`otpverification-container ${
                showOtpVerification ? "fade-in" : "fade-out"
              }`}
              style={{ display: showOtpVerification ? "block" : "none" }}
            >
              <div className="back-arrow" onClick={handleBackClick}>
                <ArowBackIcon />
              </div>
              <Stack alignItems="center" justifyContent="space-between">
                <div>
                  <h3 className="heading poppins-medium">Enter OTP</h3>
                  <p className="action-text poppins-regular">
                    Verificatio code has been sent to your email
                    <span className="cta phonenumber">
                      {formik.values.email}
                    </span>
                  </p>
                </div>
                <div className="otp_container">
                  {timeLeft > 0 ? timeLeft : <EmailFillIcon />}
                </div>
              </Stack>
              <Divider className="div-25" />
              <div className="form-container">
                <FloatingLabelInput
                  label="OTP"
                  name="otp"
                  value={formik.values.otp}
                  onChange={(value) => formik.setFieldValue("otp", value)}
                />
              </div>
              {resendPass ? (
                <p className="refrral-label">
                  Did not receive OTP? &nbsp;
                  <a href="#" className="cta" onClick={handleResendClick}>
                    Resend
                  </a>
                </p>
              ) : null}
              <Button type="submit" className="btn" block>
                Verify OTP
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Panel>
  );
};

export default ZomatoSignUp;
