import AddTask from "./components/AddTask";
import DefaultLayout from "./components/Layouts/DefaultLayout";
import TaskItem from "./components/TaskItem";
import Toolbar from "./components/Toolbar";
import styles from "./App.module.scss";
import Details from "./components/Layouts/components/Details";
import { useState } from "react";
import Menu from "./components/Popper/Menu";
import { CONTEXT_MENU_TASK } from "./store/constraints";

function App() {
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

  

  const [taskIDActive, setTaskIDActive] = useState(1);
  let taskActive;
  function handleClick(taskID) {
    setTaskIDActive(taskID);
  }

  return (
    <div className="App">
      <DefaultLayout>
        <div className={styles["wrapper"]}>
          <div className={styles["main-content"]}>
            <div className={styles["header"]}>
              <Toolbar />
              <AddTask planOptions />
            </div>
            <div className={styles["tasks-list"]}>
              {tasks.map((value, index) => {
                if (value._id === taskIDActive) {
                  taskActive = value;
                }
                return (
                  <Menu key={index} followMouse={"initial"} trigger={"contextmenu"} placement="right-start" items={CONTEXT_MENU_TASK}>
                    <div>
                      <TaskItem
                        key={index}
                        {...value}
                        isActive={value._id === taskIDActive}
                        onClick={handleClick}
                      />
                    </div>
                  </Menu>
                );
              })}
            </div>
          </div>
          <div className={styles["detail"]}>
            <Details task={taskActive} />
          </div>
        </div>
      </DefaultLayout>
    </div>
  );
}

export default App;
