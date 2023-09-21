import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./AddTask.module.scss";
import { faCalendar, faClock } from "@fortawesome/free-regular-svg-icons";
import { faPlus, faRepeat } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";

function AddTask({ planOptions }) {
  return (
    <>
      <div className={styles["wrapper"]}>
        <FontAwesomeIcon icon={faPlus} />
        <input type="text" placeholder="Add a task" />
        {planOptions ? (
          <>
            <Button leftIcon={<FontAwesomeIcon icon={faClock} />} small/>
            <Button leftIcon={<FontAwesomeIcon icon={faCalendar} />} small/>
            <Button leftIcon={<FontAwesomeIcon icon={faRepeat} />} small/>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default AddTask;
