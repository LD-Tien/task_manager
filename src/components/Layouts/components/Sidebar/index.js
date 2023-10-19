import { useEffect, useLayoutEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import SidebarItem from "./SidebarItem";
import styles from "./Sidebar.module.scss";
import TextInput from "../../../TextInput";
import { default as MenuPopper } from "../../../Popper/Menu";
import taskManager from "../../../../models/TaskManger";
import TasksList from "../../../../models/TasksList";
import {
  CONTEXT_MENU_LIST,
  SEARCH_LIST,
  SIDEBAR_DEFAULT_ITEM,
} from "../../../../store/constraints";
import { useNavigate, useParams } from "react-router-dom";

function Sidebar({ listActive, defaultList = [], userLists = [] }) {
  const [newList, setNewList] = useState("");
  const [editableListId, setEditableListId] = useState("");
  const navigate = useNavigate();
  taskManager.setEditableListId = setEditableListId;

  const { listActiveId } = useParams();

  function handleClick(listActive) {
    taskManager.setListActive(listActive);
    if (window.innerWidth <= 1113) {
      taskManager.setHiddenSidebar(true);
    }
    taskManager.setTaskActive({ taskId: -1 });
    navigate(`/home/${listActive.listId}`);
  }

  function handleRightClick(listActive) {
    taskManager.setListActive(listActive);
    taskManager.setTaskActive({ taskId: -1 });
    navigate(`/home/${listActive.listId}`);
  }

  function handleChange(input) {
    if (input.length > 30) return;
    setNewList(input);
  }

  function handleAddNewList(e) {
    e.preventDefault();
    if (newList.trim() === "") return;
    setNewList("");
    const taskList = new TasksList();
    taskList.setList({ listId: taskManager.createId(), title: newList });
    taskManager.addList(taskList);
    taskManager.setUserLists(taskManager.getAllList());
    taskManager.setListActive(taskList);
    navigate(`/home/${taskList.listId}`);

    taskList.addList(newList).then((result) => {
      if (result.code === 200) {
        taskList.setList(result.data);
      } else if (result.code === 400) {
        taskManager.showModalServerError(result.message);
      }
    });
  }

  function renderUserLists() {
    return (
      <AnimatePresence initial={window.innerWidth > 424}>
        {userLists.map((list, index) => {
          return (
            <motion.div
              key={list.listId}
              initial={{ opacity: 0, x: -30, height: 0 }}
              animate={{ opacity: 1, x: 0, height: "auto" }}
              exit={{ opacity: 0, x: -30, height: 0 }}
              transition={{ delay: (index + 4) * 0.03 }}
            >
              <MenuPopper
                key={list.listId}
                list={list}
                navigate={navigate}
                trigger="contextmenu"
                placement="bottom"
                items={CONTEXT_MENU_LIST}
              >
                <div>
                  <SidebarItem
                    key={list.listId}
                    data={list}
                    isActive={list.listId === listActive.listId}
                    editable={editableListId === list.listId}
                    onBlur={() => {
                      setEditableListId(false);
                    }}
                    onClick={handleClick}
                    onContextMenu={handleRightClick}
                  />
                </div>
              </MenuPopper>
            </motion.div>
          );
        })}
      </AnimatePresence>
    );
  }

  document.title = listActive.title + " - Task Manager";

  useEffect(() => {
    if (!listActiveId) {
      navigate(`/home/MyDay`, { replace: true });
    }
  });

  useLayoutEffect(() => {
    if (listActiveId) {
      if (listActiveId !== listActive.listId) {
        taskManager.setListActive(() => {
          if (listActiveId === "Search") {
            return SEARCH_LIST;
          }
          const defaultList = SIDEBAR_DEFAULT_ITEM.find((list) => {
            return list.listId === listActiveId;
          });
          if (defaultList) {
            return defaultList;
          }

          const userList = userLists.find((list) => {
            return list.listId === listActiveId;
          });
          if (userList) {
            return userList;
          }

          return SIDEBAR_DEFAULT_ITEM[0];
        });
      }
    }
  }, [listActiveId, listActive.listId, userLists, navigate]);

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["default-list"]}>
        <AnimatePresence initial={window.innerWidth > 740}>
          {defaultList.map((item, index) => {
            return (
              <motion.div
                key={item.listId}
                initial={{ opacity: 0, x: -30, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                transition={{ delay: index * 0.03 }}
              >
                <SidebarItem
                  key={item.listId}
                  data={item}
                  isActive={item.listId === listActive.listId}
                  onClick={handleClick}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className={styles["user-list"]}>
        {renderUserLists(userLists)}
        <form method="POST" autoComplete="off" onSubmit={handleAddNewList}>
          <TextInput
            name={"title"}
            placeholder="New list"
            value={newList}
            onChange={handleChange}
          />
        </form>
      </div>
    </div>
  );
}

export default Sidebar;
