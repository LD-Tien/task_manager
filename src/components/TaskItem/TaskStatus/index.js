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

function TaskStatus(data) {
  if (!data) {
    return;
  }
  return (
    <div className={styles["wrapper"]}>
      {data.myDay && (
        <span className={styles["task-status"]}>
          <FontAwesomeIcon icon={faSun} />
          <span className={styles["content"]}>My Day</span>
        </span>
      )}
      {data.subTasks && (
        <span className={styles["task-status"]}>
          <span>{data.subTasks.reduce((accumulator, currentValue) => currentValue.isCompleted ? accumulator + 1 : accumulator,0)}</span>
          <span>of</span>
          <span>{data.subTasks.length}</span>
        </span>
      )}
      {data.planned && (
        <span className={styles["task-status"]}>
          <FontAwesomeIcon icon={faCalendarDay} />
          <span>{data.planned}</span>
          {data.repeat && <FontAwesomeIcon icon={faRotate} />}
        </span>
      )}
      {data.category && Object.keys(data.category).length !== 0 && (
        <span className={styles["task-status"]}>
          <FontAwesomeIcon icon={faCircle} style={{color: data.category.color}}/>
          <span className={styles["content"]} style={{color: data.category.color}}>{data.category.name}</span>
        </span>
      )}
      {(data.notification || data.note || data.files) && (
        <span className={styles["task-status"]}>
          {data.notification && <FontAwesomeIcon icon={faBell} />}
          {data.note && <FontAwesomeIcon icon={faNoteSticky} />}
          {data.files && <FontAwesomeIcon icon={faPaperclip} />}
        </span>
      )}
    </div>
  );
}

export default TaskStatus;
