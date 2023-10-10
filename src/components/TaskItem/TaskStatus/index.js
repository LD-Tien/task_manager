import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
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

function TaskStatus(task) {
  if (!task) {
    return;
  }
  return (
    <div className={styles["wrapper"]}>
      {task.myDay && (
        <span className={styles["task-status"]}>
          <FontAwesomeIcon icon={faSun} />
          <span className={styles["content"]}>My Day</span>
        </span>
      )}
      {task.subTasks.length !== 0 && (
        <span className={styles["task-status"]}>
          <span>
            {task.subTasks.reduce(
              (accumulator, currentValue) =>
                currentValue.isCompleted ? accumulator + 1 : accumulator,
              0
            )}
          </span>
          <span>of</span>
          <span>{task.subTasks.length}</span>
        </span>
      )}
      {task.planned &&
        (moment(moment().format().split("T")[0]).isSameOrBefore(
          moment(moment(task.planned).format().split("T")[0])
        ) ? (
          <span
            className={styles["task-status"]}
            style={{ color: "var(--font-color-brand)" }}
          >
            <FontAwesomeIcon icon={faCalendarDay} />
            <span>{moment(task.planned).calendar().split(" ")[0]}</span>
            {/* <span>{new Date(task.planned).toString().slice(0, 11)}</span> */}
            {task.repeat && <FontAwesomeIcon icon={faRotate} />}
          </span>
        ) : (
          <span
            className={styles["task-status"]}
            style={{ color: "var(--font-color-warning)" }}
          >
            <FontAwesomeIcon icon={faCalendarDay} />
            <span>{moment(task.planned).calendar().split(" at")[0]}</span>
            {task.repeat && <FontAwesomeIcon icon={faRotate} />}
          </span>
        ))}
      {task.category && Object.keys(task.category).length !== 0 && (
        <span className={styles["task-status"]}>
          <FontAwesomeIcon
            icon={faCircle}
            style={{ color: task.category.color }}
          />
          <span
            className={styles["content"]}
            style={{ color: task.category.color }}
          >
            {task.category.name}
          </span>
        </span>
      )}
      {(task.remind || task.note.content || task.files.length !== 0) && (
        <span className={styles["task-status"]}>
          {task.remind && <FontAwesomeIcon icon={faBell} />}
          {task.note.content && <FontAwesomeIcon icon={faNoteSticky} />}
          {task.files.length !== 0 && <FontAwesomeIcon icon={faPaperclip} />}
        </span>
      )}
    </div>
  );
}

export default TaskStatus;
