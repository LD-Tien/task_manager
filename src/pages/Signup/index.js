import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextInput from "../../components/TextInput";
import styles from "./Signup.module.scss";
import Button from "../../components/Button";
import { useLayoutEffect, useState } from "react";
import {
  faCircleCheck,
  faCircleXmark,
  faEnvelope,
} from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import User from "../../models/User";

function Signup() {
  const [emailSignup, setEmailSignup] = useState("");
  const [passwordSignup, setPasswordSignup] = useState("");
  const [retypePasswordSignup, setRetypePasswordSignup] = useState("");
  const [errorTextSignup, setErrorTextSignup] = useState("");
  const [isLogged, setIsLogged] = useState(true);

  async function handleClickSignup(e) {
    e.preventDefault();
    e.preventDefault();
    if (!validateEmail(emailSignup)) {
      setErrorTextSignup("Please enter the correct email format");
      return;
    }
    if (passwordSignup.length < 4) {
      setErrorTextSignup("Password must have at least 4 characters");
      return;
    }
    if (!(retypePasswordSignup === passwordSignup)) {
      setErrorTextSignup("Re-enter password does not match password");
      return;
    }

    const user = new User({
      email: emailSignup,
      password: passwordSignup,
      username: emailSignup.split("@")[0],
    });

    const result = await user.signup();
    if (result.code === 200) {
      document.cookie = "TMToken = " + result.token;
      window.location.replace("/home");
      setErrorTextSignup("");
    } else { // code 400
      setErrorTextSignup(result.message);
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
        <Link className={styles["link"]} to={"/login"} replace>
          Already have an account
        </Link>
      </form>
    </div>
  ) : (
    <></>
  );
}

export default Signup;
