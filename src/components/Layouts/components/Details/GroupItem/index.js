import styles from "./GroupItem.module.scss";

function GroupItem({ children }) {
  return <div className={styles["wrapper"]}>{children}</div>;
}

export default GroupItem;
