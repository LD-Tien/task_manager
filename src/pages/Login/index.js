import { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

import styles from "./Login.module.scss";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import User from "../../models/User";

function Login() {
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [errorTextLogin, setErrorTextLogin] = useState("");
  const [isLogged, setIsLogged] = useState(true);

  async function handleClickLogin(e) {
    e.preventDefault();
    if(!validateEmail(emailLogin)) {
      setErrorTextLogin("Please enter the correct email format")
      return;
    }
    if(passwordLogin.length < 4) {
      setErrorTextLogin("Password must have at least 4 characters")
      return;
    }
    const user = new User({
      email: emailLogin,
      password: passwordLogin,
      username: emailLogin.split("@")[0],
    });
    const data = await user.login();
    if (!data.errorMessage) {
      // login successfully
      setErrorTextLogin("");
      document.cookie = "TMToken = " + data.token;
      window.location.replace("/home");
    } else {
      setErrorTextLogin(data.errorMessage);
    }
  }

  function validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

  async function checkLogin() {
    const result = await new User().auth();
    if (result) {
      window.location.replace("/home");
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  return !isLogged ? (
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
        <Button medium primary centerText onClick={handleClickLogin}>
          Log In
        </Button>
        <p className={styles["error-text"]}>{errorTextLogin}</p>
        <hr />
        <Link className={styles["link"]} to={"/signup"} replace>
          Create account
        </Link>
      </form>
    </div>
  ) : (
    <></>
  );
}

export default Login;
