import styles from "./TaskItem.module.scss";
import Checkbox from "../Checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import {
  faStar as faStarSolid,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import TaskStatus from "./TaskStatus";
import { useState } from "react";



function TaskItem({
  _id,
  title,
  isSubTask,
  isChecked,
  isImportant,
  isActive,
  editable,
  onClick,
  ...props
}) {
  const [isCompleted, setIsCompleted] = useState(isChecked);
  const [taskName, setTaskName] = useState(title);
  const [oldTaskID, setOldTaskID] = useState(_id);

  if (oldTaskID !== _id) {
    // When rendering a task different from the previous task
    setTaskName(title);
    setOldTaskID(_id);
  }

  function handleChecked() {
    setIsCompleted(!isCompleted);
  }

  function handleChange(e) {
    setTaskName(e.target.value);
  }

  return (
    <div
      className={`${styles["wrapper"]} ${
        isCompleted ? styles["checked"] : ""
      } ${isActive ? styles["active"] : ""} ${
        isSubTask ? styles["sub-task"] : ""
      }`}
      onClick={() => {
        if (!editable) {
          onClick(_id);
        }
      }}
      onContextMenu={(e) => {
        if (!isSubTask && !editable) {
          e.preventDefault();
          onClick(_id);
        }
      }}
    >
      <Checkbox status={isCompleted} onClick={handleChecked} />
      <div className={styles["task-content"]}>
        {editable ? (
          <input
            value={taskName}
            className={styles["task-title-input"]}
            onChange={handleChange}
          />
        ) : (
          <>
            <p className={styles["task-title"]}>{title}</p>
            <TaskStatus {...props} />
          </>
        )}
      </div>
      {isSubTask ? (
        <Checkbox
          unCheckIcon={
            <FontAwesomeIcon icon={faXmark} style={{ color: "#a19f9d" }} />
          }
          checkedIcon={null}
        />
      ) : (
        <Checkbox
          status={isImportant}
          unCheckIcon={<FontAwesomeIcon icon={faStar} />}
          checkedIcon={<FontAwesomeIcon icon={faStarSolid} />}
        />
      )}
    </div>
  );
}

export default TaskItem;
