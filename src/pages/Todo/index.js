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
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import TextInput from "../../components/TextInput";
import Accordion from "../../components/Accordion";
import Button from "../../components/Button";
import { faBell, faCalendar } from "@fortawesome/free-regular-svg-icons";

function Todo() {
  const [listActive, setListActive] = useState(SIDEBAR_DEFAULT_ITEM[0]);
  const [tasks, setTasks] = useState([]);
  const [userLists, setUserLists] = useState([]);
  const [taskActive, setTaskActive] = useState({ _id: -1 });
  

  useEffect(() => {
    fetch("/tasks", { method: "GET", "content-type": "application/json" })
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      });

    fetch("/lists", { method: "GET", "content-type": "application/json" })
      .then((res) => res.json())
      .then((data) => {
        setUserLists(data);
      });
  }, []);

  return (
    <div className={styles["wrapper"]}>
      <Header />
      <div className={styles["content"]}>
        <Sidebar
          listActive={listActive}
          setListActive={setListActive}
          defaultList={SIDEBAR_DEFAULT_ITEM}
          userList={userLists}
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
            {tasks.length !== 0 &&
              tasks.map((task) => {
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
            <Accordion title="Completed" total>
              {tasks.length !== 0 &&
                tasks.map((task) => {
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
                }).filter((item) => !!item)} 
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
