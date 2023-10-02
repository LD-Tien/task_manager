import styles from "./Todo.module.scss";
import { useEffect, useState } from "react";
import Details from "../../components/Layouts/components/Details";
import Toolbar from "../../components/Toolbar";
import TaskItem from "../../components/TaskItem";
import { default as MenuPopper } from "../../components/Popper/Menu";
import {
  CONTEXT_MENU_TASK,
  DUE_MENU_POPPER,
  REMIND_MENU_POPPER,
  REPEAT_MENU_POPPER,
  SIDEBAR_DEFAULT_ITEM,
} from "../../store/constraints";
import Sidebar from "../../components/Layouts/components/Sidebar";
import Header from "../../components/Layouts/components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faRepeat } from "@fortawesome/free-solid-svg-icons";
import TextInput from "../../components/TextInput";
import Accordion from "../../components/Accordion";
import Button from "../../components/Button";
import { faBell, faCalendar } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

function Todo() {
  const tasks = [
    {
      _id: 1,
      title: "Task1",
      subTasks: [
        { _id: 11, isCompleted: true, title: "SubTask1" },
        { _id: 12, isCompleted: true, title: "SubTask2" },
        { _id: 13, isCompleted: false, title: "SubTask2" },
        { _id: 14, isCompleted: true, title: "SubTask2" },
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
      isCompleted: false,
      listId: "01",
      userId: "01",
    },
    {
      _id: 2,
      title: "Task2",
      subTasks: [
        { _id: 21, isCompleted: false, title: "SubTask1" },
        { _id: 22, isCompleted: false, title: "SubTask2" },
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
      isCompleted: false,
      listId: "01",
      userId: "01",
    },
    {
      _id: 3,
      title: "Task3",
      subTasks: [
        { _id: 31, isCompleted: false, title: "SubTask1" },
        { _id: 32, isCompleted: false, title: "SubTask2" },
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
      isCompleted: false,
      listId: "01",
      userId: "01",
    },
    {
      _id: 4,
      title: "Task4",
      subTasks: [
        { _id: 41, isCompleted: false, title: "SubTask1" },
        { _id: 42, isCompleted: false, title: "SubTask2" },
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
      isCompleted: true,
      listId: "",
      userId: "01",
    },
    {
      _id: 5,
      title: "Task5",
      subTasks: [
        { _id: 51, isCompleted: false, title: "SubTask1" },
        { _id: 52, isCompleted: false, title: "SubTask2" },
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
      isCompleted: true,
      listId: "",
      userId: "01",
    },
    {
      _id: 6,
      title: "Task6",
      subTasks: [
        { _id: 61, isCompleted: false, title: "SubTask1" },
        { _id: 62, isCompleted: false, title: "SubTask2" },
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
      isCompleted: false,
      listId: "02",
      userId: "01",
    },
    {
      _id: 7,
      title: "Task7",
      subTasks: [
        { _id: 71, isCompleted: false, title: "SubTask1" },
        { _id: 72, isCompleted: false, title: "SubTask2" },
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
      isCompleted: false,
      listId: "02",
      userId: "01",
    },
    {
      _id: 8,
      title: "Task8",
      subTasks: [
        { _id: 81, isCompleted: false, title: "SubTask1" },
        { _id: 82, isCompleted: false, title: "SubTask2" },
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
      isCompleted: true,
      listId: "02",
      userId: "01",
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
  const [taskActive, setTaskActive] = useState(tasks[1]);

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
              <TextInput />
              <div className={styles["plan-options"]}>
                <MenuPopper
                  trigger="click"
                  placement="bottom"
                  items={DUE_MENU_POPPER}
                >
                  <div>
                    <Button
                      leftIcon={<FontAwesomeIcon icon={faCalendar} />}
                      small
                    />
                  </div>
                </MenuPopper>
                <MenuPopper
                  trigger="click"
                  placement="bottom"
                  items={REMIND_MENU_POPPER}
                >
                  <div>
                    <Button
                      leftIcon={<FontAwesomeIcon icon={faBell} />}
                      small
                    />
                  </div>
                </MenuPopper>
                <MenuPopper
                  trigger="click"
                  placement="bottom"
                  items={REPEAT_MENU_POPPER}
                >
                  <div>
                    <Button
                      leftIcon={<FontAwesomeIcon icon={faRepeat} />}
                      small
                    />
                  </div>
                </MenuPopper>
              </div>
            </div>
          </div>
          <div className={styles["tasks-list"]}>
            {tasks.map((task) => {
              if (task.isCompleted) {
                return null;
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
                      data={task}
                      isActive={task._id === taskActive._id}
                      setTaskActive={setTaskActive}
                    />
                  </div>
                </MenuPopper>
              );
            })}
          </div>
          <div className={styles["tasks-list-completed"]}>
            <Accordion title="Completed" totalTasksCompleted={10}>
              {tasks.map((task) => {
                if (!task.isCompleted) {
                  return null;
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
                        data={task}
                        isActive={task._id === taskActive._id}
                        setTaskActive={setTaskActive}
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
