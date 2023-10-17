import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import Button from "../../../Button";
import Menu from "../../../Popper/Menu";
import { faFloppyDisk, faUser } from "@fortawesome/free-regular-svg-icons";
import Modal from "../../../Modal";
import { useState } from "react";
import TextInput from "../../../TextInput";
import { ACCOUNT_MENU } from "../../../../store/constraints";
import { useAuth } from "../../../../contexts/AuthContext";
import accountImage from "./account64.png";
import taskManager from "../../../../models/TaskManger";
import { MODAL_DATA_OK } from "../../../../store/modalData";
import { EmailAuthProvider } from "firebase/auth";

function Header() {
  const { currentUser, updateUserProfile, updateUserPassword, reAuthenticate } =
    useAuth();
  const [isShowModalAccount, setIsShowModalAccount] = useState(false);
  if (!currentUser) {
    window.location.href = "/login";
  }
  const currentUserName =
    currentUser.displayName ?? currentUser.email.split("@")[0];

  const [username, setUsername] = useState(currentUserName);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const providerPassword = currentUser.providerData.some(
    (provider) => provider.providerId === "password"
  );

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateUserProfile({ displayName: username })
      .then(() => {
        taskManager.confirmModalData = MODAL_DATA_OK;
        taskManager.setShowModalConfirm(true);
      })
      .catch(() => {
        taskManager.showModalServerError();
      });
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    const credential = EmailAuthProvider.credential(
      currentUser.email,
      currentPassword
    );
    reAuthenticate(credential)
      .then(() => {
        console.log("reAuth success");
        updateUserPassword(newPassword).then(() => {
          taskManager.confirmModalData = MODAL_DATA_OK;
          taskManager.confirmModalData.title = "Password changed successfully";
          taskManager.setShowModalConfirm(true);
        });
      })
      .catch(() => {
        taskManager.confirmModalData = MODAL_DATA_OK;
        taskManager.confirmModalData.title = "Failed to change password";
        taskManager.setShowModalConfirm(true);
      });
  };
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
                {currentUser.displayName ?? currentUser.email.split("@")[0]}
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
        title="Account"
        isShow={isShowModalAccount}
        setIsShow={setIsShowModalAccount}
      >
        <form>
          <label>Username</label>
          <div>
            <TextInput
              icon={<FontAwesomeIcon icon={faUser} />}
              placeholder="Username"
              value={username}
              onChange={setUsername}
            />
            <Button
              leftIcon={<FontAwesomeIcon icon={faFloppyDisk} />}
              small
              primary
              disable={currentUserName === username}
              onClick={handleUpdateProfile}
            ></Button>
          </div>
          {providerPassword && (
            <>
              <label>Change password</label>
              <TextInput
                icon={<FontAwesomeIcon icon={faKey} />}
                type="password"
                placeholder="Current password"
                value={currentPassword}
                onChange={setCurrentPassword}
              />
              <TextInput
                icon={<FontAwesomeIcon icon={faLock} />}
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={setNewPassword}
              />
              <Button
                item
                medium
                disable={
                  currentPassword === newPassword ||
                  currentPassword.length < 6 ||
                  newPassword.length < 6
                }
                onClick={handleUpdatePassword}
                centerText
                primary
              >
                Change password
              </Button>
            </>
          )}
        </form>
      </Modal>
    </div>
  );
}

export default Header;
