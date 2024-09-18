import React, { useState, useEffect } from "react";
import { Input } from "rsuite";

const FloatingLabelInput = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,     
  touched,  
  disabled,
}) => {
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    setFocused(Boolean(value));
  }, [value]);

  return (
    <div className={`floating-label-input ${focused ? "focused" : ""}`}>
      <Input
        name={name}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(value !== "");
          onBlur(e);  
        }}
        onChange={onChange}
        size="lg"
        className={`form-control ${error && touched ? "error-border" : ""}`}
        disabled={disabled}
      />
      <label className={focused || value ? "active" : ""}>{label}</label>

      {error && touched && <div className="error-message">{error}</div>}
    </div>
  );
};

export default FloatingLabelInput;
