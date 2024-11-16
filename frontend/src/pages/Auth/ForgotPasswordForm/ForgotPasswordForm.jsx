import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthWrapper from "../AuthWrapper/AuthWrapper";
import Logo from "../../../components/Logo";
import Input from "../../../components/Input";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import { LOGIN } from "../../../router/route-path";
import styles from "./style.module.css";
import { emailPattern } from "../../../constants/regex";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    if (!emailPattern.test(value)) {
      return setError(true);
    }
  };

  return (
    <AuthWrapper>
      <div className={styles.titleContainer}>
        <Logo />
        <span className={styles.title}>Enter Your Email Address</span>
        <span className={styles.subText}>
          Enter your email address and we'll send you a link to reset your password
        </span>
      </div>
      <div className={styles.inputContainer}>
        <Input onChange={handleChange} setError={setError} error={error} title="Email Address" />
        {error ? (
          <span className={styles.errorText}>Incorrect username or password. Please try again.</span>
        ) : (
          <a className={styles.sendAgain}>Send again</a>
        )}
      </div>
      <div className={styles.buttonContainer}>
        <PrimaryButton onClick={handleSubmit}>Send Link to Email</PrimaryButton>
        <span className={styles.backTo}>
          Back to
          <a className={styles.signin} onClick={() => navigate(LOGIN)}>
            Sign in
          </a>
        </span>
      </div>
    </AuthWrapper>
  );
};

export default ForgotPassword;
