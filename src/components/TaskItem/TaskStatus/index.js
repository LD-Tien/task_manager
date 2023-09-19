import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./TaskStatus.module.scss";
import {
  faBell,
  faNoteSticky,
  faSun,
} from "@fortawesome/free-regular-svg-icons";
import {
  faCalendarDay,
  faCircle,
  faPaperclip,
  faRotate,
} from "@fortawesome/free-solid-svg-icons";

function TaskStatus(params) {
  if (!params) {
    return;
  }
  return (
    <div className={styles["wrapper"]}>
      {params.myDay && (
        <span className={styles["task-status"]}>
          <FontAwesomeIcon icon={faSun} />
          <span className={styles["content"]}>My Day</span>
        </span>
      )}
      {params.subTasks && (
        <span className={styles["task-status"]}>
          <span>{params.subTasks.reduce((accumulator, currentValue) => currentValue.isChecked ? accumulator + 1 : accumulator,0)}</span>
          <span>of</span>
          <span>{params.subTasks.length}</span>
        </span>
      )}
      {params.planned && (
        <span className={styles["task-status"]}>
          <FontAwesomeIcon icon={faCalendarDay} />
          <span>{params.planned}</span>
          {params.repeat && <FontAwesomeIcon icon={faRotate} />}
        </span>
      )}
      {params.category && Object.keys(params.category).length !== 0 && (
        <span className={styles["task-status"]}>
          <FontAwesomeIcon icon={faCircle} style={{color: params.category.color}}/>
          <span className={styles["content"]} style={{color: params.category.color}}>{params.category.name}</span>
        </span>
      )}
      {(params.notification || params.note || params.files) && (
        <span className={styles["task-status"]}>
          {params.notification && <FontAwesomeIcon icon={faBell} />}
          {params.note && <FontAwesomeIcon icon={faNoteSticky} />}
          {params.files && <FontAwesomeIcon icon={faPaperclip} />}
        </span>
      )}
    </div>
  );
}

export default TaskStatus;
