import styles from "./Button.module.scss"


function Button({ leftIcon, rightIcon, children }) {
  let Comp = "button";
  return (
    <div className={styles["wrapper"]}>
      <Comp>
        {leftIcon && <span className={styles["leftIcon"]}>{leftIcon}</span>}
        {children && <span className={styles["text"]}>{children}</span>}
        {rightIcon && <span className={styles["rightIcon"]}>{rightIcon}</span>}
      </Comp>
    </div>
  );
}

export default Button;
