import React, { useState } from "react";
import "./passwordInput.scss";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function PasswordInput({
  name,
  placeholder,
  value,
  onChange,
  onPaste,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="password">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
          onPaste={onPaste}
        />
        <div className="icon" onClick={togglePassword}>
          {showPassword ? (
            <AiOutlineEyeInvisible size={20} />
          ) : (
            <AiOutlineEye size={20} />
          )}
        </div>
      </div>
    </>
  );
}
