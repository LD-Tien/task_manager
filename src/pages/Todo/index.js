import styles from "./Todo.module.scss";
import { useState } from "react";
import Details from "../../components/Layouts/components/Details";
import Toolbar from "../../components/Toolbar";
import AddTask from "../../components/AddTask";
import TaskItem from "../../components/TaskItem";
import { default as MenuPopper } from "../../components/Popper/Menu";
import { CONTEXT_MENU_TASK } from "../../store/constraints";
import Sidebar from "../../components/Layouts/components/Sidebar";
import Header from "../../components/Layouts/components/Header";

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
      list: "Tasks",
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
      list: "Tasks",
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
      list: "Tasks",
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
      isChecked: false,
      list: "Tasks",
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
      isChecked: false,
      list: "Tasks",
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
      list: "Tasks",
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
      list: "Tasks",
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
      isChecked: false,
      list: "Tasks",
    },
  ];

  const [idActive, setIdActive] = useState("Tasks");
  const [taskIDActive, setTaskIDActive] = useState(1);
  let taskActive;
  function handleClick(taskID) {
    setTaskIDActive(taskID);
  }

  return (
    <div className={styles["wrapper"]}>
      <Header />
      <div className={styles["content"]}>
        <Sidebar idActive={idActive} setIdActive={setIdActive} />
        <div className={styles["main-content"]}>
          <div className={styles["header"]}>
            <Toolbar title={idActive}/>
            <AddTask planOptions />
          </div>
          <div className={styles["tasks-list"]}>
            {tasks.map((value, index) => {
              if (value._id === taskIDActive) {
                taskActive = value;
              }
              return (
                <MenuPopper
                  key={index}
                  followMouse={"initial"}
                  trigger={"contextmenu"}
                  placement="right-start"
                  items={CONTEXT_MENU_TASK}
                >
                  <div>
                    <TaskItem
                      key={index}
                      {...value}
                      isActive={value._id === taskIDActive}
                      onClick={handleClick}
                    />
                  </div>
                </MenuPopper>
              );
            })}
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
