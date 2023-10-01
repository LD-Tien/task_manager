import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

import styles from "./Login.module.scss";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";

function Login() {
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [errorTextLogin, setErrorTextLogin] = useState("");
  const [isLogged, setIsLogged] = useState(true);
  const navigate = useNavigate();

  function handleClickLogin(e) {
    e.preventDefault();

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email: emailLogin, password: passwordLogin }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.errorMessage) {
          // login successfully
          setErrorTextLogin("");
          document.cookie = "TMToken = " + data.token;
          navigate("/home");
        } else {
          // login failed
          setErrorTextLogin(data.errorMessage);
        }
      });
  }

  useEffect(() => {
    fetch("/checkLoginToken")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          navigate("/home");
          setIsLogged(true);
        } else {
          setIsLogged(false);
        }
      });
  }, [navigate]);

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
        <Link className={styles["link"]} to={"/signup"}>
          Create account
        </Link>
      </form>
    </div>
  ) : (
    <></>
  );
}

export default Login;
