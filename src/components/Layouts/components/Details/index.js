import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import {
  faBell,
  faCalendarDays,
  faFile,
  faSquareCaretRight,
  faSun,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";

import Button from "../../../Button";
import TaskItem from "../../../TaskItem";
import styles from "./Details.module.scss";
import GroupItem from "./GroupItem";
import Note from "../../../Note";
import { default as MenuPopper } from "../../../Popper/Menu";
import {
  REMIND_MENU_POPPER,
  DUE_MENU_POPPER,
  // REPEAT_MENU_POPPER,
} from "../../../../store/constraints";
import TextInput from "../../../TextInput";
import { useState } from "react";
import moment from "moment";
import taskManager from "../../../../models/TaskManger";
import { MODAL_DATA_DELETE_TASK } from "../../../../store/modalData";
import { File, SubTask } from "../../../../models/Task";

function Details({ task, setTasks, setTaskActive }) {
  const [newSubTask, setNewSubTask] = useState("");
  const [fileName, setFileName] = useState("");
  const [note, setNote] = useState(task.taskId === -1 ? "" : task.note.content);

  if (task.taskId === -1) return; // no selected tasks

  function handleDeleteTask() {
    taskManager.confirmModalData = MODAL_DATA_DELETE_TASK;
    taskManager.confirmModalData.title = `Task "${task.title}" will be permanently deleted`;
    taskManager.confirmModalData.onClickConfirm = () => {
      taskManager.deleteTask(task);
      taskManager.setTasks(taskManager.getAllTask());
      taskManager.setTaskActive({ taskId: -1 });

      task.deleteTask().then((result) => {
        if (result.code === 400) {
          taskManager.addTask(task);
          taskManager.setTasks(taskManager.getAllTask());
          taskManager.showModalServerError(result.message);
        }
      });
    };
    taskManager.setShowModalConfirm(true);
  }

  function handleAddSubTask(e) {
    setNewSubTask("");
    e.preventDefault();

    const subTask = new SubTask({
      subTaskId: taskManager.createId(),
      title: newSubTask,
      isCompleted: false,
    });

    task.subTasks.push(subTask);
    taskManager.setTasks(taskManager.getAllTask());

    task.addSubTask(subTask).then((result) => {
      if (result.code === 400) {
        console.log(result.error);
        taskManager.showModalServerError(result.message);
      }
    });
  }

  function handleUpdateTask() {
    taskManager.setTasks(taskManager.getAllTask());
    task.updateTask().then((result) => {
      if (result.code === 400) {
        taskManager.showModalServerError(result.message);
      }
    });
  }

  async function handleUploadFile(fileInputElement) {
    const formData = new FormData();
    const file = fileInputElement.files[0];
    formData.append("fileName", file);
    const fileSize = file.size / 1024 / 1024; // in MiB
    if (fileSize > 10) {
      alert("File size exceeds 10 MiB");
      setFileName("");
      return;
    }

    let fileData = new File({
      firebaseName: "",
      name: file.name,
      type: "",
      downloadURL: "",
    });

    task.files.push(fileData);
    taskManager.setTasks(taskManager.getAllTask());

    fetch(`/uploadFile/${task.taskId}`, {
      method: "POST",
      headers: {
        authorization: await taskManager.getIdToken(),
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.code === 200) {
          task.files[task.files.length - 1] = new File(result.data);
          setFileName("");
          taskManager.setTasks(taskManager.getAllTask());
        } else if (result.code === 400) {
          taskManager.showModalServerError(result.message);
        }
      })
      .catch(() => {
        taskManager.showModalServerError();
      });
  }

  async function handleDeleteFile(deleteFile, task) {
    taskManager.setTasks(taskManager.getAllTask());
    fetch(`/deleteFile/${deleteFile}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: await taskManager.getIdToken(),
      },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.code === 400) {
          taskManager.showModalServerError(result.message);
        }
      })
      .catch(() => {
        taskManager.showModalServerError();
      });
  }

  return (
    <div className={styles["wrapper"]}>
      <div>
        <TaskItem key={task.taskId} setTasks={setTasks} editable data={task} />
      </div>
      <GroupItem>
        {task.subTasks.map((subTask) => {
          return (
            <TaskItem
              key={subTask.subTaskId}
              editable
              isSubTask
              setTaskActive={setTaskActive}
              data={subTask}
              parentTask={task}
              setTasks={setTasks}
            />
          );
        })}
        <form method="POST" autoComplete="off" onSubmit={handleAddSubTask}>
          <TextInput
            name="subTask"
            placeholder="Add a subtask"
            value={newSubTask}
            onChange={setNewSubTask}
          />
        </form>
      </GroupItem>
      <GroupItem>
        <Button
          leftIcon={<FontAwesomeIcon icon={faSun} />}
          item
          isActive={task.myDay}
          onClick={() => {
            if (task.myDay) return;
            task.myDay = true;
            handleUpdateTask();
          }}
          onClickCancel={() => {
            task.myDay = false;
            handleUpdateTask();
          }}
        >
          {task.myDay ? "Added to My Day" : "Add to My Day"}
        </Button>
      </GroupItem>
      <GroupItem>
        <MenuPopper
          trigger="click"
          task={task}
          handleUpdate={handleUpdateTask}
          updateRemind
          items={REMIND_MENU_POPPER}
        >
          <div>
            <Button
              leftIcon={<FontAwesomeIcon icon={faBell} />}
              item
              isActive={!!task.remind}
              onClickCancel={() => {
                task.remind = "";
                handleUpdateTask();
              }}
            >
              {task.remind
                ? `Remind me at ${moment(task.remind).format("LT")}, ${
                    moment(task.remind).calendar().split(" ")[0]
                  }`
                : `Remind me`}
            </Button>
          </div>
        </MenuPopper>
        <MenuPopper
          trigger="click"
          task={task}
          handleUpdate={handleUpdateTask}
          updatePlanned
          items={DUE_MENU_POPPER}
        >
          <div>
            <Button
              leftIcon={<FontAwesomeIcon icon={faCalendarDays} />}
              item
              isActive={task.planned}
              task={task}
              danger={
                task.planned &&
                moment(moment().format().split("T")[0]).isAfter(
                  moment(moment(task.planned).format().split("T")[0])
                )
              }
              handleUpdate={handleUpdateTask}
              onClickCancel={() => {
                task.planned = "";
                handleUpdateTask();
              }}
            >
              {task.planned
                ? `${
                    moment(moment().format().split("T")[0]).isSameOrBefore(
                      moment(moment(task.planned).format().split("T")[0])
                    )
                      ? "Due,"
                      : "Overdue,"
                  } ${moment(task.planned).calendar().split(" at")[0]}`
                : "Add due date"}
            </Button>
          </div>
        </MenuPopper>
        {/* <MenuPopper trigger="click" items={REPEAT_MENU_POPPER}>
          <div>
            <Button leftIcon={<FontAwesomeIcon icon={faRotate} />} item>
              Repeat
            </Button>
          </div>
        </MenuPopper> */}
      </GroupItem>
      <GroupItem>
        {task.files.length !== 0 &&
          task.files.map((file, index) => {
            return (
              <Button
                key={index}
                href={file.downloadURL}
                disable={!file.downloadURL}
                leftIcon={<FontAwesomeIcon icon={faFile} />}
                item
                isFile
                onClickCancel={(e) => {
                  e.preventDefault();
                  handleDeleteFile(
                    task.files.splice(index, 1)[0].firebaseName,
                    task
                  );
                }}
              >
                {file.downloadURL ? file.name : `Uploading...`}
              </Button>
            );
          })}

        <div>
          <input
            id="input-file"
            type="file"
            name="fileName"
            value={fileName}
            onChange={(e) => {
              setFileName(e.target.value);
              handleUploadFile(e.target);
            }}
            style={{ display: "none" }}
          />
          <Button
            leftIcon={<FontAwesomeIcon icon={faPaperclip} />}
            item
            onClick={() => {
              document.getElementById("input-file").click();
            }}
          >
            Add file
          </Button>
        </div>
      </GroupItem>
      <GroupItem>
        <Note
          saveValue={() => {
            task.note.content = note;
            if (task.note.content === "") {
              task.note.updatedAt = "";
            } else {
              task.note.updatedAt = moment().format();
            }
            handleUpdateTask();
          }}
          value={note}
          setValue={setNote}
          timeUpdated={
            task.note.updatedAt &&
            `Updated ${moment(task.note.updatedAt).fromNow()}`
          }
        />
      </GroupItem>
      <div className={styles["bottom-bar"]}>
        <Button
          leftIcon={<FontAwesomeIcon icon={faSquareCaretRight} />}
          small
          onClick={() => setTaskActive({ taskId: -1 })}
        />
        <p className={styles["create-date"]}>
          Created on {moment(task.createdAt).calendar()}
        </p>
        <Button
          leftIcon={<FontAwesomeIcon icon={faTrashCan} />}
          small
          danger
          onClick={handleDeleteTask}
        />
      </div>
    </div>
  );
}

export default Details;
