import styles from "./Todo.module.scss";
import { useState } from "react";
import Details from "../../components/Layouts/components/Details";
import Toolbar from "../../components/Toolbar";
import TaskItem from "../../components/TaskItem";
import { default as MenuPopper } from "../../components/Popper/Menu";
import {
  CONTEXT_MENU_TASK,
  SIDEBAR_DEFAULT_ITEM,
} from "../../store/constraints";
import Sidebar from "../../components/Layouts/components/Sidebar";
import Header from "../../components/Layouts/components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import TextInput from "../../components/TextInput";
import Accordion from "../../components/Accordion";

function Todo() {
  const tasks = [
    {
      _id: 1,
      title: "Task1",
      subTasks: [
        { isChecked: true, title: "SubTask1" },
        { isChecked: true, title: "SubTask2" },
        { isChecked: false, title: "SubTask2" },
        { isChecked: true, title: "SubTask2" },
      ],
      note: "Note 1",
      files: null,
      category: {
        name: "Homework",
        color: "#ccc",
      },
      planned: "12/09/2023",
      alarm: null,
      repeat: "daily",
      myDay: true,
      isImportant: true,
      isChecked: false,
      listId: "01",
    },
    {
      _id: 2,
      title: "Task2",
      subTasks: [
        { isChecked: false, title: "SubTask1" },
        { isChecked: false, title: "SubTask2" },
      ],
      note: null,
      files: null,
      category: {
        name: "Homework",
        color: "#ccc",
      },
      planned: null,
      alarm: null,
      repeat: null,
      myDay: false,
      isImportant: false,
      isChecked: false,
      listId: "01",
    },
    {
      _id: 3,
      title: "Task3",
      subTasks: [
        { isChecked: false, title: "SubTask1" },
        { isChecked: false, title: "SubTask2" },
      ],
      note: null,
      files: null,
      category: {
        name: "Homework",
        color: "#ccc",
      },
      planned: null,
      alarm: null,
      repeat: null,
      myDay: false,
      isImportant: false,
      isChecked: false,
      listId: "01",
    },
    {
      _id: 4,
      title: "Task4",
      subTasks: [
        { isChecked: false, title: "SubTask1" },
        { isChecked: false, title: "SubTask2" },
      ],
      note: null,
      files: null,
      category: {
        name: "Homework",
        color: "#ccc",
      },
      planned: null,
      alarm: null,
      repeat: null,
      myDay: false,
      isImportant: false,
      isChecked: true,
      listId: "",
    },
    {
      _id: 5,
      title: "Task5",
      subTasks: [
        { isChecked: false, title: "SubTask1" },
        { isChecked: false, title: "SubTask2" },
      ],
      note: null,
      files: null,
      category: {
        name: "Homework",
        color: "#ccc",
      },
      planned: null,
      alarm: null,
      repeat: null,
      myDay: false,
      isImportant: false,
      isChecked: true,
      listId: "",
    },
    {
      _id: 6,
      title: "Task6",
      subTasks: [
        { isChecked: false, title: "SubTask1" },
        { isChecked: false, title: "SubTask2" },
      ],
      note: null,
      files: null,
      category: {
        name: "Homework",
        color: "#ccc",
      },
      planned: null,
      alarm: null,
      repeat: null,
      myDay: false,
      isImportant: false,
      isChecked: false,
      listId: "02",
    },
    {
      _id: 7,
      title: "Task7",
      subTasks: [
        { isChecked: false, title: "SubTask1" },
        { isChecked: false, title: "SubTask2" },
      ],
      note: null,
      files: null,
      category: {
        name: "Homework",
        color: "#ccc",
      },
      planned: null,
      alarm: null,
      repeat: null,
      myDay: false,
      isImportant: false,
      isChecked: false,
      listId: "02",
    },
    {
      _id: 8,
      title: "Task8",
      subTasks: [
        { isChecked: false, title: "SubTask1" },
        { isChecked: false, title: "SubTask2" },
      ],
      note: null,
      files: null,
      category: {
        name: "Homework",
        color: "#ccc",
      },
      planned: null,
      alarm: null,
      repeat: null,
      myDay: false,
      isImportant: false,
      isChecked: true,
      listId: "02",
    },
  ];

  const userList = [
    { _id: "01", icon: <FontAwesomeIcon icon={faList} />, title: "List 1" },
    {
      _id: "02",
      icon: <FontAwesomeIcon icon={faList} />,
      title: "List 2",
    },
  ];

  const [listActive, setListActive] = useState(SIDEBAR_DEFAULT_ITEM[0]);
  const [taskIdActive, setTaskIdActive] = useState(1);
  let taskActive;
  function handleTaskClick(taskID) {
    setTaskIdActive(taskID);
  }

  return (
    <div className={styles["wrapper"]}>
      <Header />
      <div className={styles["content"]}>
        <Sidebar
          listActive={listActive}
          setListActive={setListActive}
          defaultList={SIDEBAR_DEFAULT_ITEM}
          userList={userList}
        />
        <div className={styles["main-content"]}>
          <div className={styles["header"]}>
            <Toolbar title={listActive.title} icon={listActive.icon} />
            <div className={styles["add-task"]}>
              <TextInput planOptions />
            </div>
          </div>
          <div className={styles["tasks-list"]}>
            {tasks.map((task) => {
              if (task.isChecked) {
                return null;
              }

              if (task._id === taskIdActive) {
                taskActive = task;
              }
              
              if (listActive._id === "MyDay") {
                if (!task.myDay) return null;
              } else if (listActive._id === "Important") {
                if (!task.isImportant) return null;
              } else if (listActive._id === "Planned") {
                if (!task.planned) return null;
              } else if (listActive._id === "Tasks") {
                if (!!task.listId) return null;
              } else if (listActive._id !== task.listId) {
                return null;
              }
              return (
                <MenuPopper
                  key={task._id}
                  followMouse="initial"
                  trigger="contextmenu"
                  placement="right-start"
                  items={CONTEXT_MENU_TASK}
                >
                  <div>
                    <TaskItem
                      key={task._id}
                      {...task}
                      isActive={task._id === taskIdActive}
                      onClick={handleTaskClick}
                    />
                  </div>
                </MenuPopper>
              );
            })}
          </div>
          <div className={styles["tasks-list-completed"]}>
            <Accordion title="Completed" totalTasksCompleted={10}>
              {tasks.map((task) => {
                if (!task.isChecked) {
                  return null;
                }

                if (task._id === taskIdActive) {
                  taskActive = task;
                }

                if (listActive._id === "MyDay") {
                  if (!task.myDay) return null;
                } else if (listActive._id === "Important") {
                  if (!task.isImportant) return null;
                } else if (listActive._id === "Planned") {
                  if (!task.planned) return null;
                } else if (listActive._id === "Tasks") {
                  if (!!task.listId) return null;
                } else if (listActive._id !== task.listId) {
                  return null;
                }
                return (
                  <MenuPopper
                    key={task._id}
                    followMouse="initial"
                    trigger="contextmenu"
                    placement="right-start"
                    items={CONTEXT_MENU_TASK}
                  >
                    <div>
                      <TaskItem
                        key={task._id}
                        {...task}
                        isActive={task._id === taskIdActive}
                        onClick={handleTaskClick}
                      />
                    </div>
                  </MenuPopper>
                );
              })}
            </Accordion>
          </div>
        </div>
        <div className={styles["detail"]}>
          <Details task={taskActive} />
        </div>
      </div>
    </div>
  );
}

export default Todo;
