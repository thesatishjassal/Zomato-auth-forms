import React, { useState, useEffect } from "react";
import { Input } from "rsuite";

const FloatingLabelInput = ({ label, name, value, onChange, disabled }) => {
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (value) {
      setFocused(true);
    } else {
      setFocused(false);
    }
  }, [value]);

  return (
    <div className={`floating-label-input ${focused ? "focused" : ""}`}>
      <Input
        name={name}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(value !== "")}
        onChange={onChange}
        size="lg"
        className={
          label === "Email" || label === "One Time Password"
            ? "form-control"
            : "form-control border-bottom-none"
        }
        disabled={disabled}
        id={label === "Referral Code" ? "mb-5" : ""}
      />
      <label className={focused || value ? "active" : ""}>{label}</label>
    </div>
  );
};

export default FloatingLabelInput;
