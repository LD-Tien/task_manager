import { useState } from "react";

import SidebarItem from "./SidebarItem";
import styles from "./Sidebar.module.scss";
import TextInput from "../../../TextInput";
import { default as MenuPopper } from "../../../Popper/Menu";
import taskManager from "../../../../models/TaskManger";
import TasksList from "../../../../models/TasksList";
import {
  CONTEXT_MENU_LIST,
  SIDEBAR_DEFAULT_ITEM,
  SEARCH_LIST,
} from "../../../../store/constraints";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Sidebar({ listActive, defaultList = [], userLists = [] }) {
  const [newList, setNewList] = useState("");
  const [editableListId, setEditableListId] = useState("");
  const [search, setSearch] = useState("");
  taskManager.setEditableListId = setEditableListId;

  function handleClick(listActive) {
    taskManager.setListActive(listActive);
    taskManager.setTaskActive({ taskId: -1 });
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
    taskList.addList(newList).then((result) => {
      if (result.code === 200) {
        taskList.setList(result.data);
      } else if (result.code === 400) {
        taskManager.showModalServerError(result.message);
      }
    });
  }

  function renderUserLists() {
    return userLists.map((list) => {
      return (
        <MenuPopper
          key={list.listId}
          list={list}
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
            />
          </div>
        </MenuPopper>
      );
    });
  }

  document.title = listActive.title + " - Task Manager";

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["search"]}>
        <TextInput
          type="search"
          value={search}
          icon={
            <FontAwesomeIcon
              icon={faSearch}
              className={styles["search-icon"]}
            />
          }
          placeholder="Search tasks"
          onChange={(value) => {
            setSearch(value);
            if (value) {
              taskManager.searchKeywords = value;
              taskManager.searchTasks();
              taskManager.setListActive({ ...SEARCH_LIST });
            } else {
              taskManager.searchKeywords = value;
              taskManager.tasksSearched = [];
              taskManager.setListActive(SIDEBAR_DEFAULT_ITEM[0]);
            }
          }}
        />
      </div>
      <div className={styles["default-list"]}>
        {defaultList.map((item) => {
          return (
            <SidebarItem
              key={item.listId}
              data={item}
              isActive={item.listId === listActive.listId}
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
