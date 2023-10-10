import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./BottomBar.module.scss";
import { faSquareCaretRight, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import Button from "../../../../Button";

function BottomBar({ onClickDelete = () => {}, onClickClose = () => {} }) {
  return (
    <div className={styles["wrapper"]}>
      <Button
        leftIcon={<FontAwesomeIcon icon={faSquareCaretRight} />}
        small
        onClick={onClickClose}
      />
      <p className={styles["create-date"]}>Create on Sun, September 10</p>
      <Button
        leftIcon={<FontAwesomeIcon icon={faTrashCan} />}
        small
        danger
        onClick={onClickDelete}
      />
    </div>
  );
}

export default BottomBar;
