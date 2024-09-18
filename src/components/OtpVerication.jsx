import React, { useState } from "react";
import { useFormik } from "formik";
import { Button, Divider, Stack } from "rsuite";
import FloatingLabelInput from "./FloatingLabelInput";
import ArrowBackIcon from "@rsuite/icons/ArowBack";
import EmailFillIcon from "@rsuite/icons/EmailFill";
import { RegisterSchema } from "../Schema/RegisterSchema";

const OtpVerification = ({
  showOtpVerification,
  resendPass,
  handleResendClick,
  timeLeft,
  handleBackClick,
  onSubmit,
}) => {
  const [otpVerified, setOtpVerified] = useState(false);

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: RegisterSchema.pick(["otp"]),
    onSubmit: (values) => {
      if (values.otp.length === 6) {
        setOtpVerified(true);
        console.log("OTP Verified:", values.otp);
        onSubmit(values); // Call the parent component's handler with the OTP value
      }
    },
  });

  const handleNumericInput = (value) => {
    const numericValue = value.replace(/\D/g, ""); 
    if (numericValue.length <= 6) {
      formik.setFieldValue("otp", numericValue);
    }
  };

  return (
    <div
      className={`otpverification-container ${
        showOtpVerification ? "fade-in" : "fade-out"
      }`}
      style={{ display: showOtpVerification ? "block" : "none" }}
    >
      <div className="back-arrow" onClick={handleBackClick}>
        <ArrowBackIcon />
      </div>
      <Stack alignItems="center" justifyContent="space-between">
        <div>
          <h3 className="heading poppins-medium">Enter OTP</h3>
          <p className="action-text poppins-regular">
            OTP has been sent to your email.
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
          onChange={(value) => handleNumericInput(value)}
          onBlur={formik.handleBlur}
          error={formik.errors.otp}
          touched={formik.touched.otp}
        />
      </div>
      {resendPass && (
        <p className="refrral-label">
          Did not receive OTP? &nbsp;
          <a href="#" className="cta" onClick={handleResendClick}>
            Resend
          </a>
        </p>
      )}

      <Button
        type="submit"
        className={`btn ${otpVerified ? "success-button" : ""}`}
        block
        style={{
          backgroundColor: otpVerified ? "#4CAF50" : "",
          transition: "background-color 0.3s ease-in-out",
        }}
        onClick={formik.handleSubmit}
      >
        {otpVerified ? "OTP Verified" : "Verify OTP"}
      </Button>
    </div>
  );
};

export default OtpVerification;
