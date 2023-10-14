import { useState } from "react";
import styles from "./SidebarItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import taskManager from "../../../../../models/TaskManger";

function SidebarItem({
  isActive,
  onClick,
  editable = false,
  onBlur = () => {},
  data,
}) {
  const [listName, setListName] = useState(data.title);
  function handelChange(input) {
    if (input.length > 30) return;
    setListName(input);
  }

  function handleUpdateList() {
    const listNameUpdate = listName.trim();

    //validate
    if (listNameUpdate === "" || listNameUpdate === data.title) {
      setListName(data.title);
      return;
    }
    data.title = listNameUpdate;
    taskManager.setUserLists(taskManager.getAllList()); // refresh

    data.updateList(listNameUpdate).then((result) => {
      if (result.code === 400) {
        taskManager.showModalServerError(result.message);
      }
    });
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleUpdateList();
      onBlur();
    }
  }
  return (
    <div
      onClick={() => {
        onClick(data);
      }}
      onContextMenu={(e) => {
        onClick(data);
        e.preventDefault();
      }}
      className={`${styles["wrapper"]} ${isActive && styles["active"]}`}
    >
      <span className={styles["icon"]}>
        {data.leftIcon ? data.leftIcon : <FontAwesomeIcon icon={faList} />}
      </span>
      {!editable ? (
        <span className={styles["title"]}>{listName}</span>
      ) : (
        <input
          type="text"
          className={styles["input-list-name"]}
          value={listName}
          onChange={(e) => handelChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            onBlur();
            handleUpdateList();
          }}
          autoFocus
        ></input>
      )}
      {data.total !== 0 && (
        <span className={styles["totalTasks"]}>{data.total}</span>
      )}
    </div>
  );
}

export default SidebarItem;
