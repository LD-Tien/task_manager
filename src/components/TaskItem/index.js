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
  data,
  isActive,
  editable,
  setTaskActive
}) {
  const [isCompleted, setIsCompleted] = useState(data.isCompleted);
  const [taskName, setTaskName] = useState(data.title);

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
        data.isSubTask ? styles["sub-task"] : ""
      }`}
      onClick={() => {
        if (!editable) {
          setTaskActive(data);
        }
      }}
      onContextMenu={(e) => {
        if (!data.isSubTask && !editable) {
          e.preventDefault();
          setTaskActive(data);
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
            <p className={styles["task-title"]}>{data.title}</p>
            <TaskStatus {...data} />
          </>
        )}
      </div>
      {data.isSubTask ? (
        <Checkbox
          unCheckIcon={
            <FontAwesomeIcon icon={faXmark} style={{ color: "#a19f9d" }} />
          }
          checkedIcon={null}
        />
      ) : (
        <Checkbox
          status={data.isImportant}
          unCheckIcon={<FontAwesomeIcon icon={faStar} />}
          checkedIcon={<FontAwesomeIcon icon={faStarSolid} />}
        />
      )}
    </div>
  );
}

export default TaskItem;
