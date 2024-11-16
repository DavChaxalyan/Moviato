import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthWrapper from "../AuthWrapper";
import Logo from "../../../components/Logo";
import Input from "../../../components/Input";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import { LOGIN, HOME, FORGOT_PASSWORD } from "../../../router/route-path";
import styles from "./style.module.css";
import { emailPattern } from "../../../constants/regex";

const Register = () => {
  const navigate = useNavigate();

  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [reenterPasswordError, setReenterPasswordError] = useState(false);

  const [usernameValue, setUsernameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [reenterPasswordValue, setReenterPasswordValue] = useState("");

  const handleSubmit = () => {
    let isError = false;

    if (!emailPattern.test(emailValue)) {
      setEmailError(true);
      isError = true;
    } else {
      setEmailError(false);
    }

    if (!passwordValue) {
      setPasswordError(true);
      isError = true;
    } else {
      setPasswordError(false);
    }

    if (!reenterPasswordValue || passwordValue !== reenterPasswordValue) {
      setReenterPasswordError(true);
      isError = true;
    } else {
      setReenterPasswordError(false);
    }

    if (isError) {
      return;
    }

    localStorage.setItem("isLoggedInUser", true);
    navigate(HOME);
  };

  const handleUsernameChange = (event) => {
    setUsernameValue(event.target.value);
    setUsernameError(false);
  };

  const handleEmailChange = (event) => {
    setEmailValue(event.target.value);
    setEmailError(false);
  };

  const handlePasswordChange = (event) => {
    setPasswordValue(event.target.value);
    setPasswordError(false);
  };

  const handleReenterPasswordChange = (event) => {
    setReenterPasswordValue(event.target.value);
    setReenterPasswordError(false);
  };

  const navigateToForgetPassword = () => {
    navigate(FORGOT_PASSWORD);
  };

  return (
    <AuthWrapper>
      <div className={styles.titleContainer}>
        <Logo />
        <span className={styles.title}>Create Account</span>
      </div>
      <div className={styles.inputContainer}>
        <Input
          inputClassName={styles.inputField}
          value={usernameValue}
          title="Username"
          onChange={handleUsernameChange}
          error={usernameError}
          setError={setUsernameError}
        />
        <Input
          inputClassName={styles.inputField}
          value={emailValue}
          title="Email Address"
          onChange={handleEmailChange}
          error={emailError}
          setError={setEmailError}
        />
        <Input
          inputClassName={styles.inputField}
          value={passwordValue}
          title="Password"
          type="password"
          onChange={handlePasswordChange}
          error={passwordError}
          setError={setPasswordError}
        />
        <Input
          inputClassName={styles.inputField}
          value={reenterPasswordValue}
          title="Re-enter Password"
          type="password"
          onChange={handleReenterPasswordChange}
          error={reenterPasswordError}
          setError={setReenterPasswordError}
        />
      </div>
      <div className={styles.buttonContainer}>
        <PrimaryButton onClick={handleSubmit}>Create Account</PrimaryButton>
        <span className={styles.createAccount}>
          Already have an account?
          <a className={styles.signin} onClick={() => navigate(LOGIN)}>
            Sign in
          </a>
        </span>
      </div>
    </AuthWrapper>
  );
};

export default Register;
