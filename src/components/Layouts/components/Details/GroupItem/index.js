import styles from "./GroupItem.module.scss";
import { motion } from "framer-motion";

function GroupItem({ children }) {
  return window.innerWidth > 424 ? (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      className={styles["wrapper"]}
    >
      {children}
    </motion.div>
  ) : (
    <div className={styles["wrapper"]}>{children}</div>
  );
}

export default GroupItem;
