import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Modal.module.scss";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";

function Modal({
  type,
  title,
  children,
  isShow,
  setIsShow,
  onClickConfirm,
  confirmContent = "Delete",
  confirmType,
  onClickCancel,
  cancelContent = "Cancel",
}) {
  return (
    <>
      {isShow ? (
        <>
          <div
            onClick={() => {
              if (confirmType !== "error") {
                setIsShow(!isShow);
              }
            }}
            className={styles["outside"]}
          ></div>
          <div className={styles["wrapper"]}>
            <div className={styles["header"]}>
              <p className={styles["title"]}>{title}</p>
              {confirmType !== "error" && (
                <span
                  onClick={() => setIsShow(!isShow)}
                  className={styles["close"]}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </span>
              )}
            </div>
            <div className={styles["body"]}>{children}</div>
            {type === "confirm" && (
              <div className={styles["footer"]}>
                {confirmType !== "error" && (
                  <Button
                    medium
                    onClick={() => {
                      if (onClickCancel) {
                        onClickCancel();
                      }
                      setIsShow(!isShow);
                    }}
                  >
                    {cancelContent}
                  </Button>
                )}
                <Button
                  medium
                  danger={confirmType === "danger"}
                  primary={confirmType === "error"}
                  onClick={() => {
                    if (onClickConfirm) {
                      onClickConfirm();
                    }
                    if (confirmType !== "error") {
                      setIsShow(!isShow);
                    }
                  }}
                >
                  {confirmContent}
                </Button>
              </div>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default Modal;
