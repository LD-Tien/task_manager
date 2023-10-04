import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Modal.module.scss";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Modal({ title = "title", children, isShow, setIsShow }) {
  return (
    <>
      {isShow ? (
        <>
          <div
            onClick={() => setIsShow(!isShow)}
            className={styles["outside"]}
          ></div>
          <div className={styles["wrapper"]}>
            <div className={styles["header"]}>
              <p className={styles["title"]}>{title}</p>
              <span
                onClick={() => setIsShow(!isShow)}
                className={styles["close"]}
              >
                <FontAwesomeIcon icon={faXmark} />
              </span>
            </div>
            <div className={styles["body"]}>{children}</div>
            <div className={styles["footer"]}></div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default Modal;
