import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  faCircleCheck,
  faCircleXmark,
  faEnvelope,
} from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import TextInput from "../../components/TextInput";
import styles from "./Signup.module.scss";
import Button from "../../components/Button";

function Signup() {
  const [emailSignup, setEmailSignup] = useState("");
  const [passwordSignup, setPasswordSignup] = useState("");
  const [retypePasswordSignup, setRetypePasswordSignup] = useState("");
  const [errorTextSignup, setErrorTextSignup] = useState("");
  const { signup, login } = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleClickSignup(e) {
    e.preventDefault();
    if (!validateEmail(emailSignup)) {
      setErrorTextSignup("Please enter the correct email format");
      return;
    }
    if (passwordSignup.length < 6) {
      setErrorTextSignup("Password should be at least 6 characters");
      return;
    }
    if (!(retypePasswordSignup === passwordSignup)) {
      setErrorTextSignup("Confirm password does not match password");
      return;
    }

    setLoading(true);
    signup(emailSignup, passwordSignup)
      .then(() => {
        login(emailSignup, passwordSignup);
        setLoading(false);
      })
      .catch(() => {
        setErrorTextSignup("Email already in use, please try another");
        setLoading(false);
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
          placeholder="Confirm password"
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
        <Button
          medium
          disable={loading}
          primary
          centerText
          onClick={handleClickSignup}
        >
          Sign Up
        </Button>
        <p className={styles["error-text"]}>{errorTextSignup}</p>
        <hr />
        <Link className={styles["link"]} to={"/login"} replace>
          Already have an account, Log in
        </Link>
      </form>
    </div>
  );
}

export default Signup;
