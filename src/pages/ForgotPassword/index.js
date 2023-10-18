import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

import styles from "./ForgotPassword.module.scss";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import { useAuth } from "../../contexts/AuthContext";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const { forgotPassword } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (showMessage) {
      setShowMessage(false);
    }
    if (!validateEmail(email)) {
      setErrorText("Please enter the correct email format");
      return;
    }

    forgotPassword(email)
      .then(() => {
        setErrorText("");
        setLoading(false);
        setShowMessage(true);
      })
      .catch(() => {
        setErrorText("Failed to send email reset password");
        setLoading(false);
        setShowMessage(false);
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
        <p className={styles["title"]}>Reset password</p>
        <p>Enter the email address registered on your account.</p>
        <TextInput
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={setEmail}
          icon={<FontAwesomeIcon icon={faEnvelope} />}
        />
        <Button
          disable={loading}
          medium
          primary
          centerText
          onClick={handleSubmit}
        >
          Send
        </Button>
        <p
          className={styles["error-text"]}
          style={{ display: errorText ? "block" : "none" }}
        >
          {errorText}
        </p>

        <div
          className={styles["success-message"]}
          style={{ display: showMessage ? "block" : "none" }}
        >
          <p>Send email success</p>
          <p>please check your email to reset password</p>
        </div>

        <hr />
        <Link className={styles["link"]} to={"/login"} replace>
          Return to login
        </Link>
      </form>
    </div>
  );
}

export default ForgotPassword;
