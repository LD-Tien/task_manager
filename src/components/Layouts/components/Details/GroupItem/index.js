import styles from "./GroupItem.module.scss";
import { motion } from "framer-motion";

function GroupItem({ children}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      className={styles["wrapper"]}
    >
      {children}
    </motion.div>
  );
}

export default GroupItem;
