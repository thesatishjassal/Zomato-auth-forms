import { Panel } from "rsuite";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Button, Divider, Stack } from "rsuite";
import FloatingLabelInput from "./FloatingLabelInput";
import ArowBackIcon from "@rsuite/icons/ArowBack";
import MessageIcon from "@rsuite/icons/Message";
import SwiggyLogo from "../assets/swiggy-logo.png";
import "rsuite/dist/rsuite.min.css";

const SingInForm = () => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [resendPass, setResendPass] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);

  const formik = useFormik({
    initialValues: {
      phonenumber: "",
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
        src="https://miro.medium.com/v2/resize:fit:1400/1*iBebVuGHJ8Gqoo-LTzCbAg.png"
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
              <Stack alignItems="center" justifyContent="space-between">
                <div>
                  <h3 className="heading poppins-medium">Login</h3>
                  <p className="action-text poppins-regular">
                    or &nbsp;
                    <a href="" className="active cta">
                      Create an account
                    </a>
                  </p>
                </div>
                {/* <img className="swiggy-icon" src={SwiggyLogo} alt="Swiggy" /> */}
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
              <Button type="submit" className="btn mt-30" block>
                countinue
              </Button>
              <p className="term-cond-text">
                By clicking on Login, I accept the
                <a href="."> Terms & Conditions</a> &
                <a href="."> Privacy Policy</a>
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
                    We've sent an OTP to your phone number{" "}
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
                <FloatingLabelInput
                  label="One Time Password"
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

export default SingInForm;
