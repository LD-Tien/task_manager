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
import taskManager from "../../models/TaskManger";

function TaskItem({
  data,
  isActive,
  editable,
  setTaskActive,
  isSubTask,
  parentTask,
}) {
  const [taskName, setTaskName] = useState(data.title);

  function handleChange(e) {
    setTaskName(e.target.value);
    data.title = e.target.value;
  }

  function handleUpdateTask(e) {
    if (e) e.preventDefault();

    taskManager.setTasks(taskManager.getAllTask());

    if (isSubTask) {
      parentTask.updateSubTask(data).then((result) => {
        if (result.code === 400) {
          taskManager.showModalServerError(result.message);
        }
      });
    } else {
      taskManager.setTasks(taskManager.getAllTask());
      data.updateTask().then((result) => {
        if (result.code === 400) {
          taskManager.showModalServerError(result.message);
        }
      });
    }
  }

  function handleDeleteSubTask() {
    parentTask.subTasks = parentTask.subTasks.filter(
      (item) => item.subTaskId !== data.subTaskId
    );
    taskManager.setTasks(taskManager.getAllTask());

    parentTask.deleteSubTask(data).then((result) => {
      if (result.code === 400) {
        taskManager.showModalServerError(result.message);
      }
    });
  }

  return (
    <div
      className={`${styles["wrapper"]} ${
        data.isCompleted ? styles["checked"] : ""
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
        }
      }}
    >
      <Checkbox
        status={data.isCompleted}
        onClick={() => {
          data.isCompleted = !data.isCompleted;
          handleUpdateTask();
        }}
      />
      <div className={styles["task-content"]}>
        {editable ? (
          <input
            value={taskName}
            className={styles["task-title-input"]}
            onChange={handleChange}
            onBlur={handleUpdateTask}
            spellCheck="false"
          />
        ) : (
          <>
            <p className={styles["task-title"]}>{data.title}</p>
            <TaskStatus {...data} />
          </>
        )}
      </div>
      {isSubTask ? (
        <Checkbox
          unCheckIcon={
            <FontAwesomeIcon
              icon={faXmark}
              style={{ color: "var(--font-color-secondary)" }}
            />
          }
          checkedIcon={null}
          onClick={handleDeleteSubTask}
        />
      ) : (
        <Checkbox
          status={data.isImportant}
          unCheckIcon={<FontAwesomeIcon icon={faStar} />}
          checkedIcon={<FontAwesomeIcon icon={faStarSolid} />}
          onClick={() => {
            data.isImportant = !data.isImportant;
            handleUpdateTask();
          }}
        />
      )}
    </div>
  );
}

export default TaskItem;
