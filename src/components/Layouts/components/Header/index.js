import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import Button from "../../../Button";
import Menu from "../../../Popper/Menu";
import { faFloppyDisk, faUser } from "@fortawesome/free-regular-svg-icons";
import Modal from "../../../Modal";
import {useState } from "react";
import TextInput from "../../../TextInput";
import { ACCOUNT_MENU } from "../../../../store/constraints";
import { useAuth } from "../../../../contexts/AuthContext";
import accountImage from "./account64.png";

function Header() {
  const { currentUser } = useAuth();
  const [isShowModalAccount, setIsShowModalAccount] = useState(false);

  if (!currentUser) {
    window.location.href = "/login";
  }
  return (
    <div className={styles["wrapper"]}>
      <Link href="/home" className={styles["brand"]}>
        Task Manager
      </Link>
      <div className={styles["button-list"]}>
        <Menu
          trigger="mouseenter"
          showModalAccount={setIsShowModalAccount}
          placement="bottom-end"
          items={ACCOUNT_MENU}
        >
          <div className={styles["account"]}>
            <div>
              <p className={styles["username"]}>
                {currentUser.providerData[0].displayName ??
                  currentUser.email.split("@")[0]}
              </p>
              <p className={styles["email"]}>{currentUser.email}</p>
            </div>
            <Button small>
              <div
                className={styles["avatar"]}
                style={{
                  backgroundImage: `url(${
                    currentUser.photoURL ?? accountImage
                  })`,
                  marginBottom: "-2px",
                }}
              />
            </Button>
          </div>
        </Menu>
      </div>
      <Modal
        title="Account (Feature not working)"
        isShow={isShowModalAccount}
        setIsShow={setIsShowModalAccount}
      >
        <form>
          <label>Username</label>
          <div>
            <TextInput
              icon={<FontAwesomeIcon icon={faUser} />}
              placeholder="Username"
              value={
                currentUser.providerData[0].displayName ??
                currentUser.email.split("@")[0]
              }
            />
            <Button
              leftIcon={<FontAwesomeIcon icon={faFloppyDisk} />}
              small
              primary
              disable
            ></Button>
          </div>
          <label>Change password</label>
          <TextInput
            icon={<FontAwesomeIcon icon={faKey} />}
            type="password"
            placeholder="Current password"
          />
          <TextInput
            icon={<FontAwesomeIcon icon={faLock} />}
            type="password"
            placeholder="New password"
          />
          <Button item medium disable centerText primary>
            Change password
          </Button>
        </form>
      </Modal>
    </div>
  );
}

export default Header;
