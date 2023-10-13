import styles from "./Todo.module.scss";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
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
import Button from "../../components/Button";
import moment from "moment";
import taskManager from "../../models/TaskManger";
import Task from "../../models/Task";
import Modal from "../../components/Modal";

function Todo() {
  const [listActive, setListActive] = useState(SIDEBAR_DEFAULT_ITEM[0]);
  const [tasks, setTasks] = useState([]);
  const [taskActive, setTaskActive] = useState({ _id: -1 });
  const [titleNewTask, setTitleNewTask] = useState("");
  const [showModalConfirm, setShowModalConfirm] = useState(true);
  let [userLists, setUserLists] = useState([]);
  let defaultLists = useRef(SIDEBAR_DEFAULT_ITEM);

  taskManager.setListActive = setListActive;
  taskManager.setTasks = setTasks;
  taskManager.setTaskActive = setTaskActive;
  taskManager.setUserLists = setUserLists;
  taskManager.setShowModalConfirm = setShowModalConfirm;

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
          if (item._id === "MyDay") {
            tasks[i].myDay && item.total++;
          } else if (item._id === "Important") {
            tasks[i].isImportant && item.total++;
          } else if (item._id === "Planned") {
            tasks[i].planned && item.total++;
          } else if (item._id === "Tasks") {
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
        if (task.listId === list._id && !task.isCompleted) {
          return ++total;
        }
        return total;
      }, 0);
      return list;
    });
  }, [userLists, tasks]);

  const createDataTask = () => {
    return new Task({
      title: titleNewTask,
      subTasks: [],
      listId:
        listActive._id === "MyDay" ||
        listActive._id === "Important" ||
        listActive._id === "Planned" ||
        listActive._id === "Tasks"
          ? null
          : listActive._id,
      isImportant: listActive._id === "Important",
      myDay: listActive._id === "MyDay",
      planned: listActive._id === "Planned" ? moment().format("L") : "",
      remind: "",
      isSendNotification: false,
      repeat: "",
      files: [],
      note: {
        content: "",
        updatedAt: "",
      },
    });
  };

  const handleAddTask = (e) => {
    setTitleNewTask("");
    e.preventDefault();
    if (titleNewTask === "") return;

    const task = createDataTask();

    task.addTask().then((result) => {
      if (result.code === 200) {
        setTasks(taskManager.getAllTask());
      }
    });
  };

  const handleUpdateTask = (task) => {
    task.updateTask().then((result) => {
      if (result.code === 200) {
        setTasks(taskManager.getAllTask);
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
        <Sidebar
          listActive={listActive}
          setListActive={setListActive}
          setTaskActive={setTaskActive}
          defaultList={defaultLists.current}
          userLists={userLists}
          setUserLists={setUserLists}
        />
        <div className={styles["main-content"]}>
          <div className={styles["header"]}>
            <Toolbar
              title={listActive.title}
              icon={
                !!listActive.leftIcon ? (
                  listActive.leftIcon
                ) : (
                  <FontAwesomeIcon icon={faList} />
                )
              }
            />
            {!taskManager.searchKeywords && (
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
          </div>

          {!taskManager.searchKeywords ? (
            <>
              <div className={styles["tasks-list"]}>
                {tasks.length !== 0 &&
                  tasks.map((task) => {
                    if (task.isCompleted) {
                      return null;
                    }

                    if (listActive._id === "MyDay") {
                      if (!task.myDay) {
                        return null;
                      }
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
                        task={task}
                        followMouse="initial"
                        trigger="contextmenu"
                        placement="right-start"
                        items={CONTEXT_MENU_TASK}
                      >
                        <div>
                          <TaskItem
                            key={task}
                            data={task}
                            isActive={task._id === taskActive._id}
                            setTaskActive={setTaskActive}
                            setTasks={setTasks}
                          />
                        </div>
                      </MenuPopper>
                    );
                  })}
              </div>
              <div className={styles["tasks-list-completed"]}>
                <Accordion title="Completed" total>
                  {tasks.length !== 0 &&
                    tasks
                      .map((task) => {
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
                            task={task}
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
                                setTasks={setTasks}
                              />
                            </div>
                          </MenuPopper>
                        );
                      })
                      .filter((item) => !!item)}
                  {/* remove item null in array by filter */}
                </Accordion>
              </div>
            </>
          ) : (
            <div className={styles["tasks-list"]}>
              {taskManager.tasksSearched.length !== 0 &&
                taskManager.tasksSearched.map((task) => {
                  return (
                    <MenuPopper
                      key={task._id}
                      task={task}
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
                          setTasks={setTasks}
                        />
                      </div>
                    </MenuPopper>
                  );
                })}
            </div>
          )}
        </div>
        <div className={styles["detail"]}>
          <Details
            key={taskActive._id}
            task={taskActive}
            setTasks={setTasks}
            setTaskActive={setTaskActive}
          />
        </div>
      </div>
      <Modal
        type="confirm"
        isShow={showModalConfirm}
        setIsShow={setShowModalConfirm}
        title={taskManager.confirmModalData.title}
        confirm={taskManager.confirmModalData.confirmContent}
        confirmContent={taskManager.confirmModalData.confirmContent}
        onClickConfirm={taskManager.confirmModalData.onClickConfirm}
        onClickCancel={taskManager.confirmModalData.onClickCancel}
      >
        {taskManager.confirmModalData.body}
      </Modal>
    </div>
  );
}

export default Todo;
