import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

import styles from "./Login.module.scss";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import { useAuth } from "../../contexts/AuthContext";

function Login() {
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [errorTextLogin, setErrorTextLogin] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();

  async function handleClickLogin(e) {
    e.preventDefault();
    if (!validateEmail(emailLogin)) {
      setErrorTextLogin("Please enter the correct email format");
      return;
    }
    if (passwordLogin.length < 6) {
      setErrorTextLogin("Password should be at least 6 characters");
      return;
    }
    setLoading(true);
    login(emailLogin, passwordLogin)
      .then(() => {
        setErrorTextLogin("");
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setErrorTextLogin("Email or password is incorrect");
      });
  }

  async function handleClickLoginWithGoogle(e) {
    e.preventDefault();
    setLoading(true);
    loginWithGoogle()
      .then(() => {
        setErrorTextLogin("");
        setLoading(false);
      })
      .catch(() => {
        setErrorTextLogin(
          "Email already in use. Try another email"
        );
      });
  }

  function validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

  return (
    <div className={styles["wrapper"]}>
      <form method="POST">
        <p className={styles["title"]}>LOG IN</p>
        <TextInput
          type="email"
          placeholder="Email"
          name="email"
          value={emailLogin}
          onChange={setEmailLogin}
          icon={<FontAwesomeIcon icon={faEnvelope} />}
        />
        <TextInput
          type="password"
          placeholder="Password"
          name="password"
          value={passwordLogin}
          onChange={setPasswordLogin}
          icon={<FontAwesomeIcon icon={faLock} />}
        />
        <Button
          disable={loading}
          medium
          primary
          centerText
          onClick={handleClickLogin}
        >
          Log In
        </Button>
        <p
          className={styles["error-text"]}
          style={{ display: errorTextLogin ? "block" : "none" }}
        >
          {errorTextLogin}
        </p>
        <Link className={styles["link"]} to={"/forgotPassword"} replace>
          Forgot password?
        </Link>
        <div className={styles["or"]}>
          <hr />
          OR
          <hr />
        </div>
        <Button
          leftIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="24"
              height="24"
              viewBox="0 0 48 48"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
          }
          disable={loading}
          medium
          onClick={handleClickLoginWithGoogle}
        >
          Sign in with Google
        </Button>
        <hr />
        <Link className={styles["link"]} to={"/signup"} replace>
          Create an account? Sign up
        </Link>
      </form>
    </div>
  );
}

export default Login;
