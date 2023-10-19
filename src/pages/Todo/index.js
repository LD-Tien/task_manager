import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { motion, AnimatePresence } from "framer-motion";

import styles from "./Todo.module.scss";
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
import TextInput from "../../components/TextInput";
import Accordion from "../../components/Accordion";
import Button from "../../components/Button";
import taskManager from "../../models/TaskManger";
import Task from "../../models/Task";
import { Route, Routes } from "react-router-dom";

function Todo() {
  const [listActive, setListActive] = useState(SIDEBAR_DEFAULT_ITEM[0]);
  const [tasks, setTasks] = useState([]);
  const [taskActive, setTaskActive] = useState({ taskId: -1 });
  const [titleNewTask, setTitleNewTask] = useState("");
  const [hiddenSidebar, setHiddenSidebar] = useState(true);
  let [userLists, setUserLists] = useState([]);
  let defaultLists = useRef(SIDEBAR_DEFAULT_ITEM);

  taskManager.setListActive = setListActive;
  taskManager.setTasks = setTasks;
  taskManager.setTaskActive = setTaskActive;
  taskManager.setUserLists = setUserLists;
  taskManager.setHiddenSidebar = setHiddenSidebar;

  async function getData() {
    await taskManager.getDataFromAPI();
    setUserLists(taskManager.getAllList());
    setTasks(taskManager.getAllTask());
  }

  // add total prop to list
  defaultLists.current = useMemo(() => {
    return defaultLists.current.map((item) => {
      item.total = 0;
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i] && !tasks[i].isCompleted) {
          if (item.listId === "MyDay") {
            tasks[i].myDay && item.total++;
          } else if (item.listId === "Important") {
            tasks[i].isImportant && item.total++;
          } else if (item.listId === "Planned") {
            tasks[i].planned && item.total++;
          } else if (item.listId === "Tasks") {
            !tasks[i].listId && item.total++;
          }
        }
      }
      return item;
    });
  }, [tasks]);

  // add total prop to list
  userLists = useMemo(() => {
    return userLists.map((list) => {
      list.total = 0;
      list.total = tasks.reduce((total, task) => {
        if (task.listId === list.listId && !task.isCompleted) {
          return ++total;
        }
        return total;
      }, 0);
      return list;
    });
  }, [userLists, tasks]);

  const createDataTask = () => {
    return new Task({
      taskId: taskManager.createId(),
      title: titleNewTask,
      subTasks: [],
      listId:
        listActive.listId === "MyDay" ||
        listActive.listId === "Important" ||
        listActive.listId === "Planned" ||
        listActive.listId === "Tasks"
          ? null
          : listActive.listId,
      isImportant: listActive.listId === "Important",
      myDay: listActive.listId === "MyDay",
      planned: listActive.listId === "Planned" ? moment().format("L") : "",
      remind: "",
      isSendNotification: false,
      repeat: "",
      files: [],
      note: {
        content: "",
        updatedAt: "",
      },
      createdAt: new Date().toISOString(),
    });
  };

  const handleAddTask = (e) => {
    setTitleNewTask("");
    e.preventDefault();
    if (titleNewTask === "") return;

    const task = createDataTask();
    taskManager.addTask(task);
    setTasks(taskManager.getAllTask());

    task.addTask().then((result) => {
      if (result.code === 200) {
        task.setTask(result.data);
      } else if (result.code === 400) {
        taskManager.showModalServerError(result.message);
      }
    });
  };

  const handleUpdateTask = (task) => {
    setTasks(taskManager.getAllTask());
    task.updateTask().then((result) => {
      if (result.code === 400) {
        taskManager.showModalServerError(result.message);
      }
    });
  };

  useEffect(() => {
    let timer;
    function notificationRemind() {
      taskManager.getAllTask().forEach((task) => {
        if (
          !task.isSendNotification &&
          task.remind &&
          !isNaN(new Date(task.remind)) &&
          new Date(task.remind) - new Date() <= 0
        ) {
          new Notification("Remind", {
            body: task.title,
          });
          task.isSendNotification = true;
          handleUpdateTask(task);
        }
      });
    }
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        notificationRemind();
        setTimeout(() => {
          notificationRemind();
          timer = setInterval(notificationRemind, 60000);
        }, 62000 - (new Date().getSeconds() + 1) * 1000);
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
          if (permission === "granted") {
            notificationRemind();
            setTimeout(() => {
              notificationRemind();
              timer = setInterval(notificationRemind, 60000);
            }, 62000 - (new Date().getSeconds() + 1) * 1000);
            timer = setInterval(notificationRemind, 60000);
          }
        });
      }
    }

    return () => {
      clearInterval(timer);
    };
  }, []);

  useLayoutEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles["wrapper"]}>
      <Header />
      <div className={styles["content"]}>
        <div
          className={styles["wrapper-sidebar"]}
          onClick={() => {
            if (!hiddenSidebar) {
              setHiddenSidebar(true);
            }
          }}
        >
          <AnimatePresence>
            <motion.div
              key={hiddenSidebar}
              className={`${styles["sidebar"]} ${
                styles[`${hiddenSidebar ? "hidden-sidebar" : ""}`]
              }`}
              onClick={(e) => {
                e.stopPropagation();
              }}
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 300 }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Routes>
                <Route
                  path="/:listActiveId/*"
                  element={
                    <Sidebar
                      listActive={listActive}
                      setListActive={setListActive}
                      setTaskActive={setTaskActive}
                      defaultList={defaultLists.current}
                      userLists={userLists}
                      setUserLists={setUserLists}
                    />
                  }
                />
                <Route
                  path="/"
                  element={
                    <Sidebar
                      listActive={listActive}
                      setListActive={setListActive}
                      setTaskActive={setTaskActive}
                      defaultList={defaultLists.current}
                      userLists={userLists}
                      setUserLists={setUserLists}
                    />
                  }
                />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={styles["main-content"]}>
          <motion.div className={styles["header"]}>
            <Toolbar
              listId={listActive.listId}
              title={listActive.title}
              icon={
                !!listActive.leftIcon ? (
                  listActive.leftIcon
                ) : (
                  <FontAwesomeIcon icon={faList} />
                )
              }
            />
            {listActive.listId !== "Search" && (
              <div className={styles["add-task"]}>
                <form method="POST" autoComplete="off" onSubmit={handleAddTask}>
                  <TextInput
                    name="title"
                    value={titleNewTask}
                    onChange={setTitleNewTask}
                  />
                </form>
                <Button
                  small
                  rounded
                  primary
                  disable={!titleNewTask.trim()}
                  onClick={(e) => {
                    handleAddTask(e);
                  }}
                >
                  Add
                </Button>
                {/* <MenuPopper
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
                </MenuPopper> */}
              </div>
            )}
          </motion.div>

          {listActive.listId !== "Search" ? (
            <>
              <div className={styles["tasks-list"]}>
                {tasks.length !== 0 && (
                  <AnimatePresence key={listActive.listId}>
                    {tasks.map((task, index) => {
                      if (task.isCompleted) {
                        return null;
                      }
                      if (listActive.listId === "MyDay") {
                        if (!task.myDay) {
                          return null;
                        }
                      } else if (listActive.listId === "Important") {
                        if (!task.isImportant) return null;
                      } else if (listActive.listId === "Planned") {
                        if (!task.planned) return null;
                      } else if (listActive.listId === "Tasks") {
                        if (!!task.listId) return null;
                      } else if (listActive.listId !== task.listId) {
                        return null;
                      }
                      return (
                        <motion.div
                          key={task.taskId}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0, margin: 0 }}
                          transition={{ delay: index * 0.03 }}
                        >
                          <MenuPopper
                            key={task.taskId}
                            task={task}
                            followMouse="initial"
                            trigger="contextmenu"
                            placement="top"
                            items={CONTEXT_MENU_TASK}
                          >
                            <div>
                              <TaskItem
                                key={task.taskId}
                                data={task}
                                listActiveId={listActive.listId}
                                isActive={task.taskId === taskActive.taskId}
                                setTaskActive={setTaskActive}
                                setTasks={setTasks}
                              />
                            </div>
                          </MenuPopper>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                )}
              </div>
              <div className={styles["tasks-list-completed"]}>
                <Accordion key={listActive.listId} title="Completed" total>
                  {tasks.length !== 0 &&
                    tasks
                      .map((task, index) => {
                        if (!task.isCompleted) {
                          return null;
                        }

                        if (listActive.listId === "MyDay") {
                          if (!task.myDay) return null;
                        } else if (listActive.listId === "Important") {
                          if (!task.isImportant) return null;
                        } else if (listActive.listId === "Planned") {
                          if (!task.planned) return null;
                        } else if (listActive.listId === "Tasks") {
                          if (!!task.listId) return null;
                        } else if (listActive.listId !== task.listId) {
                          return null;
                        }

                        return (
                          <motion.div
                            key={task.taskId}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0, margin: 0 }}
                            transition={{
                              type: "tween",
                              duration: 0.1,
                              delay: index * 0.03,
                            }}
                          >
                            <MenuPopper
                              key={task.taskId}
                              task={task}
                              followMouse="initial"
                              trigger="contextmenu"
                              placement="top"
                              items={CONTEXT_MENU_TASK}
                            >
                              <div>
                                <TaskItem
                                  key={task.taskId}
                                  data={task}
                                  listActiveId={listActive.listId}
                                  isActive={task.taskId === taskActive.taskId}
                                  setTaskActive={setTaskActive}
                                  setTasks={setTasks}
                                />
                              </div>
                            </MenuPopper>
                          </motion.div>
                        );
                      })
                      .filter((item) => !!item)}
                  {/* remove item null in array by filter */}
                </Accordion>
              </div>
            </>
          ) : (
            <div className={styles["tasks-list"]}>
              {taskManager.tasksSearched.length !== 0 && (
                <AnimatePresence>
                  {taskManager.tasksSearched.map((task, index) => {
                    return (
                      <motion.div
                        key={task.taskId}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0, margin: 0 }}
                        transition={{ delay: index * 0.03 }}
                      >
                        <MenuPopper
                          key={task.taskId}
                          task={task}
                          followMouse="initial"
                          trigger="contextmenu"
                          placement="top"
                          items={CONTEXT_MENU_TASK}
                        >
                          <div>
                            <TaskItem
                              key={task.taskId}
                              data={task}
                              listActiveId={listActive.listId}
                              isActive={task.taskId === taskActive.taskId}
                              setTaskActive={setTaskActive}
                              setTasks={setTasks}
                            />
                          </div>
                        </MenuPopper>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              )}
            </div>
          )}
        </div>
        <Routes>
          <Route
            path="/:listActiveId/:taskActiveId"
            element={
              <AnimatePresence>
                {taskActive.taskId !== -1 &&
                  (window.innerWidth > 740 ? (
                    <motion.div
                      className={styles["detail"]}
                      initial={{ width: 0 }}
                      animate={{ width: "auto" }}
                      exit={{ width: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Details
                        key={taskActive.taskId}
                        task={taskActive}
                        setTasks={setTasks}
                        setTaskActive={setTaskActive}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      className={styles["detail"]}
                      initial={{ opacity: 0, x: 300 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 300 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Details
                        key={taskActive.taskId}
                        task={taskActive}
                        setTasks={setTasks}
                        setTaskActive={setTaskActive}
                      />
                    </motion.div>
                  ))}
              </AnimatePresence>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default Todo;
