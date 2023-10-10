import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faRotate } from "@fortawesome/free-solid-svg-icons";
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

function Details({ task, setTasks, setTaskActive }) {
  const [newSubTask, setNewSubTask] = useState("");
  const [fileName, setFileName] = useState("");
  const [note, setNote] = useState(task._id === -1 ? "" : task.note.content);

  if (task._id === -1) return;
  function handleDeleteTask() {
    task.deleteTask().then((result) => {
      if (result.code === 200) {
        taskManager.setTasks(taskManager.getAllTask());
        taskManager.setTaskActive({ _id: -1 });
      }
    });
  }

  function handleAddSubTask(e) {
    setNewSubTask("");
    e.preventDefault();

    task.addSubTask(newSubTask).then((result) => {
      if (result.code === 200) {
        taskManager.setTasks(taskManager.getAllTask());
      }
    });
  }

  function handleUpdateTask() {
    task.updateTask().then((result) => {
      if (result.code === 200) {
        taskManager.setTasks(taskManager.getAllTask());
      }
    });
  }

  function handleUploadFile(fileInputElement) {
    const file = fileInputElement.files[0];
    const formData = new FormData();
    formData.append("fileName", file);
    fetch("/uploadFile", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        task.files.push(data);
        handleUpdateTask();
        setFileName("");
        setTasks((prev) => [...prev]);
      });
  }

  function handleDeleteFile(deleteFile, task) {
    fetch(`/deleteFile/${deleteFile}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(task),
    }).then((res) => {
      if (res.status === 200) {
        setTasks((prev) => [...prev]);
      }
    });
  }

  return (
    <div className={styles["wrapper"]}>
      <div>
        <TaskItem key={task._id} setTasks={setTasks} editable data={task} />
      </div>
      <GroupItem>
        {task.subTasks.map((subTask) => {
          return (
            <TaskItem
              key={subTask._id}
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
              isActive={!!task.planned}
              task={task}
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
                {file.name}
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
          onClick={() => setTaskActive({ _id: -1 })}
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
