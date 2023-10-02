import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextInput from "../../components/TextInput";
import styles from "./Signup.module.scss";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import {
  faCircleCheck,
  faCircleXmark,
  faEnvelope,
} from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [emailSignup, setEmailSignup] = useState("");
  const [passwordSignup, setPasswordSignup] = useState("");
  const [retypePasswordSignup, setRetypePasswordSignup] = useState("");
  const [isLogged, setIsLogged] = useState(true);
  const navigate = useNavigate();

  function handleClickSignup(e) {
    e.preventDefault();

    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email: emailSignup, password: passwordSignup }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.errorMessage) {
          // signup successfully
          document.cookie = "TMToken = " + data.token;
          navigate("/home")
          setErrorTextSignup("");
        } else {
          // login failed
          setErrorTextSignup(data.errorMessage);
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
  const [errorTextSignup, setErrorTextSignup] = useState("");
  return !isLogged ? (
    <div className={styles["wrapper"]}>
      <form>
        <p className={styles["title"]}>SIGN UP</p>
        <TextInput
          type="email"
          placeholder="Email"
          name="email"
          onChange={setEmailSignup}
          icon={<FontAwesomeIcon icon={faEnvelope} />}
        />
        <TextInput
          type="password"
          placeholder="Password"
          name="password"
          onChange={setPasswordSignup}
          icon={<FontAwesomeIcon icon={faLock} />}
        />
        <TextInput
          type="password"
          placeholder="Retype password"
          onChange={setRetypePasswordSignup}
          icon={
            passwordSignup === retypePasswordSignup ? (
              <FontAwesomeIcon
                icon={faCircleCheck}
                style={{ color: "green" }}
              />
            ) : (
              <FontAwesomeIcon icon={faCircleXmark} style={{ color: "red" }} />
            )
          }
        />
        <Button medium primary centerText onClick={handleClickSignup}>
          Sign Up
        </Button>
        <p className={styles["error-text"]}>{errorTextSignup}</p>
        <hr />
        <Link className={styles["link"]} to={"/login"}>
          Already have a account
        </Link>
      </form>
    </div>
  ) : (
    <></>
  );
}

export default Signup;
