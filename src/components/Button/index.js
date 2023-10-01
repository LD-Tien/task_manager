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
  subText,
  danger,
  primary,
  disabled,
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
      className={`${styles["wrapper"]} ${item ? styles["item"] : null} ${
        small ? styles["small"] : medium ? styles["medium"] : null
      } ${isActive ? styles["active"] : null} ${
        isFile ? styles["file"] : null
      } ${danger ? styles["danger"] : null} ${
        centerText ? styles["center-text"] : null
      } ${disabled ? styles["disabled"] : null} ${
        primary ? styles["primary"] : null
      }`}
    >
      <Comp
        onClick={onClick}
        href={!!href ? href : null}
        target={!!href ? "_blank" : null}
      >
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
