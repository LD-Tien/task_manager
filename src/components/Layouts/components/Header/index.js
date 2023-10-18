import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faKey,
  faLock,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import Button from "../../../Button";
import Menu from "../../../Popper/Menu";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import Modal from "../../../Modal";
import { useState } from "react";
import TextInput from "../../../TextInput";
import { ACCOUNT_MENU } from "../../../../store/constraints";
import { useAuth } from "../../../../contexts/AuthContext";
import accountImage from "./account64.png";
import taskManager from "../../../../models/TaskManger";
import { MODAL_DATA_OK } from "../../../../store/modalData";
import { EmailAuthProvider } from "firebase/auth";
import {
  SEARCH_LIST,
} from "../../../../store/constraints";

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
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

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
    <div
      className={styles["wrapper"]}
      onClick={() => {
        if (window.innerWidth <= 1113) {
          taskManager.setHiddenSidebar(true);
        }
      }}
    >
      <div className={styles["left-column"]}>
        <FontAwesomeIcon
          icon={faBars}
          className={styles["bars-btn"]}
          onClick={(e) => {
            e.stopPropagation();
            taskManager.setHiddenSidebar((prev) => !prev);
          }}
        />
        <Link href="/home" className={styles["brand"]}>
          Task Manager
        </Link>
      </div>
      <div className={styles["search"]}>
        <TextInput
          type="search"
          value={search}
          icon={
            <FontAwesomeIcon
              icon={faSearch}
              className={styles["search-icon"]}
            />
          }
          placeholder="Search tasks"
          onFocus={(value) => {
            if (
              value.length !== 0 &&
              !window.location.pathname.includes("/Search")
            ) {
              navigate(window.location.href);
              navigate("/home/Search", { replace: true });
            }
          }}
          onChange={(value) => {
            if (value.length === 1 && search.length === 0) {
              navigate(window.location.href);
              navigate("/home/Search", { replace: true });
            }
            taskManager.setTaskActive({ taskId: -1 });
            setSearch(value);
            if (value) {
              taskManager.searchKeywords = value;
              taskManager.searchTasks();
              taskManager.setListActive({ ...SEARCH_LIST });
              navigate("/home/Search", { replace: true });
            } else {
              taskManager.searchKeywords = value;
              taskManager.tasksSearched = [];
              if (window.location.pathname.includes("/home/Search")) {
                navigate(-1);
              }
            }
          }}
        />
      </div>
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
          <TextInput
            icon={<FontAwesomeIcon icon={faUser} />}
            placeholder="Username"
            value={username}
            onChange={setUsername}
          />
          <Button
            medium
            primary
            centerText
            disable={currentUserName === username}
            onClick={handleUpdateProfile}
          >
            Save
          </Button>
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
