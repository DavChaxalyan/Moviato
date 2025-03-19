import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import { emailPattern } from "../../../constants/regex";
import AuthWrapper from "../AuthWrapper";
import Input from "../../../components/Input";
import { FORGOT_PASSWORD, HOME, REGISTER } from "../../../router/route-path";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import Logo from "../../../components/Logo/Logo";
import { loginUser } from "../../../api/auth/login";
import { getCurrentUser } from "../../../api/auth/profile";

const Login = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleSubmit = async () => {
    if (!emailPattern.test(usernameValue)) {
      return setError(true);
    }
    if (!passwordValue) {
      return setError(true);
    }
    
    setError(false);

    try {
      const response = await loginUser({ email: usernameValue, password: passwordValue });
      if (response) {
        console.log(response);
        
        localStorage.setItem("isLoggedInUser", true); 
        navigate(HOME);
        getCurrentUser()
      }
    } catch (err) {
      setError(true); 
      console.error("Ошибка при логине:", err);
    }
  };

  const handleUsernameChange = (event) => {
    setUsernameValue(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPasswordValue(event.target.value);
  };

  const navigateToForgetPassword = () => {
    navigate(FORGOT_PASSWORD);
  };

  return (
    <AuthWrapper>
      <div className={styles.title}>
        <Logo />
        <span className={styles.signin}>Sign in</span>
      </div>
      <div className={styles.inputs}>
        <Input
          inputClassName={styles.usernameInput}
          value={usernameValue}
          title="Email"
          onChange={handleUsernameChange}
          error={error}
          setError={setError}
          focused={usernameFocused}
          setFocused={setUsernameFocused}
          onBlur={() => setUsernameFocused(false)}
        />

        <Input
          type="password"
          value={passwordValue}
          title="Password"
          onChange={handlePasswordChange}
          error={error}
          setError={setError}
          focused={passwordFocused}
          setFocused={setPasswordFocused}
          onBlur={() => setPasswordFocused(false)}
        />
        {error ? (
          <span className={styles.errorText}>Incorrect username or password. Please try again.</span>
        ) : (
          <a className={styles.forgotThePassword} onClick={navigateToForgetPassword}>
            Forgot the password
          </a>
        )}
      </div>
      <div className={styles.divider} />
      <div className={styles.buttons}>
        <PrimaryButton onClick={handleSubmit}>Sign in</PrimaryButton>
        {error ? (
          <span className={styles.createAccount}>
            Forgot your password?
            <a className={styles.forgotThePassword} onClick={navigateToForgetPassword}>
              Reset password
            </a>
          </span>
        ) : (
          <span className={styles.createAccount}>
            Don't have an account?{" "}
            <a className={styles.forgotThePassword} onClick={() => navigate(REGISTER)}>
              Sign up
            </a>
          </span>
        )}
      </div>
    </AuthWrapper>
  );
};

export default Login;
