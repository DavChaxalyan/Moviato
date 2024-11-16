import React, { useState } from "react";
import styles from "./style.module.css";
import SvgIcon from "../SvgIcon";

const Input = ({
  title,
  type,
  inputClassName,
  value,
  onChange = () => {},
  onBlur = () => {},
  error,
  setError = () => {},
  focused,
  setFocused = () => {},
}) => {
  const [passwordVisible, setPasswordVisible] = useState("password");

  return (
    <div className={styles.inputContainer}>
      <span className={`${styles.placeholder}  ${focused && styles.activeColor} ${error && styles.errorPlaceholder}`}>
        {title}
      </span>
      <input
        type={type === "password" ? passwordVisible : type}
        value={value}
        onChange={onChange}
        onFocus={() => {
          setError(false);
          setFocused(true);
        }}
        onBlur={onBlur}
        className={`${styles.inputName} ${styles.input} ${error && styles.errorInput} ${inputClassName}`}
      />
      {type === "password" && (
        <div
          className={`${styles.eyeIcon} ${error && styles.errorEyeIcon}`}
          onClick={() => setPasswordVisible((prev) => (prev === "password" ? "text" : "password"))}
        >
          <SvgIcon
            iconName={
              passwordVisible === "password"
                ? error
                  ? "icon_eye_off_error"
                  : "icon_eye_off"
                : error
                ? "icon_eye_on_error"
                : "icon_eye_on"
            }
          />
        </div>
      )}
    </div>
  );
};

export default Input;
