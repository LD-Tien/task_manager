import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./BottomBar.module.scss";
import { faCircleXmark, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import Button from "../../../../Button";

function BottomBar(params) {
  return (
    <div className={styles["wrapper"]}>
      <Button leftIcon={<FontAwesomeIcon icon={faCircleXmark} />} small />
      <p className={styles["create-date"]}>Create on Sun, September 10</p>
      <Button leftIcon={<FontAwesomeIcon icon={faTrashCan} />} small/>
    </div>
  );
}

export default BottomBar;
