import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./SidebarItem.module.scss";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function SidebarItem({
  icon = <FontAwesomeIcon icon={faBars} />,
  isActive,
  totalTasks,
  children,
}) {
  return (
    <div className={`${styles["wrapper"]} ${isActive && styles["active"]}`}>
      <span className={styles["icon"]}>{icon}</span>
      <span className={styles["title"]}>{children}</span>
      <span className={styles["totalTasks"]}>{totalTasks}</span>
    </div>

  );
}

export default SidebarItem;
