import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Button.module.scss";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Button({
  leftIcon,
  rightIcon,
  item,
  small,
  href,
  isActive,
  isFile,
  subText,
  danger,
  children,
  onClick,
  onClickCancel,
}) {
  let Comp = "button";
  if (!!href) {
    Comp = "a";
  }
  return (
    <div
      className={`${styles["wrapper"]} ${item ? styles["item"] : ""} ${
        small ? styles["small"] : ""
      } ${isActive ? styles["active"] : ""} ${isFile ? styles["file"] : ""} ${danger ? styles["danger"] : ""}`}
    >
      <Comp href={!!href ? href : null} target={!!href ? "_blank" : null}>
        {leftIcon && <span className={styles["leftIcon"]}>{leftIcon}</span>}
        {children && <span className={styles["text"]}>{children}</span>}
        {subText && <span className={styles["sub-text"]}>{subText}</span>}
        {rightIcon && <span className={styles["rightIcon"]}>{rightIcon}</span>}
        {(isActive || isFile) && (
          <span className={styles["cancel"]} onClick={onClickCancel}>
            {<FontAwesomeIcon icon={faXmark} style={{ color: "#a19f9d" }} />}
          </span>
        )}
      </Comp>
    </div>
  );
}

export default Button;
