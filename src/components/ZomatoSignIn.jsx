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

const ZomotoSigInForm = () => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [resendPass, setResendPass] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [signinwithemail, setsigninwithemail] = useState(false);
  const [RedirectEmailOtp, setRedirectEmailOTP] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      phonenumber: "",
      otp: ["", "", "", "", "", ""],
    },
    onSubmit: (values) => {
      if (!showOtpVerification) {
        setShowOtpVerification(true);
      } else {
        console.log("OTP Verified:", values);
      }
    },
  });
  const handleChange = (index, value) => {
    const otp = [...formik.values.otp];
    otp[index] = value;
    formik.setFieldValue("otp", otp);

    // Move focus to the next input field
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };
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
    if (RedirectEmailOtp) {
      setShowOtpVerification(false);
      setsigninwithemail(true);
    } else {
      setShowOtpVerification(false);
      setsigninwithemail(false);
    }
  };

  const handleHomeBack = () => {
    setShowOtpVerification(false);
    setsigninwithemail(false);
    setRedirectEmailOTP(false);
  };

  const handleLoginWithEmail = () => {
    setsigninwithemail(true);
  };

  const handleEmailLoginOTP = () => {
    setShowOtpVerification(true);
    setsigninwithemail(false);
    setRedirectEmailOTP(true);
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
                showOtpVerification || signinwithemail ? "fade-out" : "fade-in"
              }`}
              style={{
                display:
                  showOtpVerification || signinwithemail ? "none" : "block",
              }}
            >
              <Stack alignItems="center" justifyContent="space-between">
                <div>
                  <h3 className="heading poppins-medium">Let's Eat!</h3>
                </div>
                <img className="swiggy-icon" src={Zomoto} alt="Swiggy" />
              </Stack>
              <Divider className="div-25" />
              <div className="form-container">
                <FloatingLabelInput
                  label="Phone Number"
                  name="phone Number"
                  value={formik.values.phonenumber}
                  onChange={(value) =>
                    formik.setFieldValue("phoneNumber", value)
                  }
                />
              </div>
              <Button type="submit" className="btn" block>
                Send One Time Password
              </Button>
              <Divider>or</Divider>
              <Button
                className="outline-btn"
                startIcon={<EmailFillIcon />}
                onClick={handleLoginWithEmail}
                block
              >
                Countinue with Email
              </Button>
              <p className="text-center action-text poppins-regular">
                New to Zomato? &nbsp;
                <a href="" className="active cta">
                  Create an account
                </a>
              </p>
            </div>
            <div
              className={`emailotpverification-container ${
                signinwithemail ? "fade-in" : "fade-out"
              }`}
              style={{ display: signinwithemail ? "block" : "none" }}
            >
              <div className="back-arrow" onClick={handleHomeBack}>
                <ArowBackIcon />
              </div>
              <Stack alignItems="center" justifyContent="space-between">
                <div>
                  <h3 className="heading poppins-medium">Enter Email</h3>
                </div>
                <div className="otp_container">
                  {timeLeft > 0 ? timeLeft : <EmailFillIcon />}
                </div>
              </Stack>
              <Divider className="div-25" />
              <div className="form-container">
                <FloatingLabelInput
                  label="Enter Your Email"
                  name="Email"
                  value={formik.values.email}
                  onChange={(value) => formik.setFieldValue("email", value)}
                />
              </div>
              <Button
                type="submit"
                className="btn"
                block
                onClick={handleEmailLoginOTP}
              >
                Send One Time password
              </Button>
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
                  <h3 className="heading poppins-medium">OTP Verification</h3>
                  <p className="action-text poppins-regular">
                    Check text message for your OTP for
                    <span className="cta phonenumber">
                      {formik.values.phonenumber}
                    </span>
                  </p>
                </div>
                <div className="otp_container">
                  {timeLeft > 0 ? timeLeft : <MessageIcon />}
                </div>
              </Stack>
              <Divider className="div-25" />
              <div className="form-container">
                <div className="otp-container">
                  {formik.values.otp.map((digit, index) => (
                    <input
                      className="form-control"
                      key={index}
                      id={`otp-input-${index}`}
                      type="text"
                      name={`otp-${index}`}
                      value={digit}
                      onChange={(event) => handleChange(index, event)}
                      maxLength="1"
                    />
                  ))}
                </div>
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

export default ZomotoSigInForm;
