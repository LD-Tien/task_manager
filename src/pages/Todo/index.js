import styles from "./Todo.module.scss";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
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

function Todo() {
  const [listActive, setListActive] = useState(SIDEBAR_DEFAULT_ITEM[0]);
  const [tasks, setTasks] = useState([]);
  const [taskActive, setTaskActive] = useState({ _id: -1 });
  let [userLists, setUserLists] = useState([]);
  let defaultLists = useRef(SIDEBAR_DEFAULT_ITEM);

  async function getDataFromAPI() {
    await fetch("/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      });

    await fetch("/lists")
      .then((res) => res.json())
      .then((data) => {
        setUserLists(data);
      });
  }

  // add total prop to list
  defaultLists.current = useMemo(() => {
    return defaultLists.current.map((item) => {
      item.total = 0;
      for (let i = 0; i < tasks.length; i++) {
        if (!tasks[i].isCompleted) {
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

  useLayoutEffect(() => {
    getDataFromAPI();
  }, []);

  return (
    <div className={styles["wrapper"]}>
      <Header />
      <div className={styles["content"]}>
        <Sidebar
          listActive={listActive}
          setListActive={setListActive}
          defaultList={defaultLists.current}
          userLists={userLists}
          setUserLists={setUserLists}
        />
        <div className={styles["main-content"]}>
          <div className={styles["header"]}>
            <Toolbar
              title={listActive.title}
              icon={
                !!listActive.icon ? (
                  listActive.icon
                ) : (
                  <FontAwesomeIcon icon={faList} />
                )
              }
            />
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
                  })
                  .filter((item) => !!item)}
              {/* remove item null in array by filter */}
            </Accordion>
          </div>
        </div>
        <div className={styles["detail"]}>
          <Details task={taskActive} setTaskActive={setTaskActive} />
        </div>
      </div>
    </div>
  );
}

export default Todo;
