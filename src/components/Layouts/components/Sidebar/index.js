import { useState } from "react";

import SidebarItem from "./SidebarItem";
import styles from "./Sidebar.module.scss";
import TextInput from "../../../TextInput";
import { default as MenuPopper } from "../../../Popper/Menu";
import taskManager from "../../../../models/TaskManger";
import TasksList from "../../../../models/TasksList";
import { CONTEXT_MENU_LIST } from "../../../../store/constraints";

function Sidebar({ listActive, defaultList = [], userLists = [] }) {
  const [newList, setNewList] = useState("");
  const [editableListId, setEditableListId] = useState("");
  taskManager.setEditableListId = setEditableListId;

  function handleClick(listActive) {
    taskManager.setListActive(listActive);
    taskManager.setTaskActive({ _id: -1 });
  }

  function handleChange(input) {
    if (input.length > 30) return;
    setNewList(input);
  }

  async function handleAddNewList(e) {
    e.preventDefault();
    if (newList.trim() === "") return;
    setNewList("");
    const taskList = new TasksList();
    taskList.addList(newList).then((result) => {
      if (result.code === 200) {
        taskManager.setListActive(taskList);
        taskManager.setUserLists(taskManager.getAllList());
      }
    });
  }

  function renderUserLists() {
    return userLists.map((list) => {
      return (
        <MenuPopper
          key={list._id}
          list={list}
          trigger="contextmenu"
          placement="bottom"
          items={CONTEXT_MENU_LIST}
        >
          <div>
            <SidebarItem
              key={list._id}
              data={list}
              isActive={list._id === listActive._id}
              editable={editableListId === list._id}
              onBlur={() => {
                setEditableListId(false);
              }}
              onClick={handleClick}
            />
          </div>
        </MenuPopper>
      );
    });
  }

  document.title = listActive.title + " - Task Manager";

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["default-list"]}>
        {defaultList.map((item) => {
          return (
            <SidebarItem
              key={item._id}
              data={item}
              isActive={item._id === listActive._id}
              onClick={handleClick}
            />
          );
        })}
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
