import { useState } from "react";
import styles from "./SidebarItem.module.scss";

function SidebarItem({ isActive, onClick, editable = false, ...dataItem }) {
  const [listName, setListName] = useState(dataItem.title);

  function handelChange(input) {
    setListName(input);
  }

  function handleKeyDown(e) {
    if(e.key === "Enter") {
      console.log("enter")
    }
  }

  return (
    <div
      onClick={() => {
        onClick(dataItem);
      }}
      onContextMenu={(e) => {
        onClick(dataItem);
        e.preventDefault();
      }}
      className={`${styles["wrapper"]} ${isActive && styles["active"]}`}
    >
      <span className={styles["icon"]}>{dataItem.icon}</span>
      {!editable ? (
        <span className={styles["title"]}>{dataItem.title}</span>
      ) : (
        <input
          type="text"
          className={styles["input-list-name"]}
          value={listName}
          onChange={(e) => handelChange(e.target.value)}
          onKeyDown={handleKeyDown}
        ></input>
      )}
      {dataItem.totalTasks && (
        <span className={styles["totalTasks"]}>{dataItem.totalTasks}</span>
      )}
    </div>
  );
}

export default SidebarItem;
