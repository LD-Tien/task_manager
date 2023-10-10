import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Button.module.scss";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Button({
  leftIcon,
  rightIcon,
  item,
  small,
  medium,
  centerText,
  href,
  isActive,
  isFile,
  subTitle,
  danger,
  primary,
  disable,
  children,
  onClick,
  onClickCancel,
}) {
  let Comp = "button";
  let props = {};
  if (href) {
    Comp = "a";
    props.href = href;
    props.target = "_blank";
  }
  if (typeof onClick === "function") {
    props.onClick = (e) => {
      onClick(e);
    };
  }
  return (
    <div
      className={`${styles["wrapper"]} ${item ? styles["item"] : ""} ${
        small ? styles["small"] : medium ? styles["medium"] : ""
      } ${isActive ? styles["active"] : ""} ${isFile ? styles["file"] : ""} ${
        danger ? styles["danger"] : ""
      } ${centerText ? styles["center-text"] : ""} ${
        disable ? styles["disable"] : ""
      } ${primary ? styles["primary"] : ""}`}
    >
      <Comp {...props}>
        {leftIcon && <span className={styles["left-icon"]}>{leftIcon}</span>}
        {children && <span className={styles["text"]}>{children}</span>}
        {subTitle && <span className={styles["sub-text"]}>{subTitle}</span>}
        {rightIcon && <span className={styles["right-icon"]}>{rightIcon}</span>}
        {(isActive || isFile) && (
          <span
            className={styles["cancel"]}
            onClick={(e) => {
              e.stopPropagation();
              onClickCancel(e);
            }}
          >
            {<FontAwesomeIcon icon={faXmark} style={{ color: "#a19f9d" }} />}
          </span>
        )}
      </Comp>
    </div>
  );
}

export default Button;
