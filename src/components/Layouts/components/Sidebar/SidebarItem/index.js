import { useState } from "react";
import styles from "./SidebarItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

function SidebarItem({
  isActive,
  onClick,
  editable = false,
  handleUpdate = () => {},
  onBlur = () => {},
  data,
}) {
  const [listName, setListName] = useState(data.title);

  function handelChange(input) {
    setListName(input);
    data.title = input;
  }

  function handleUpdateList(data) {
    fetch(`/updateList/${data._id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title: data.title }),
    });
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      console.log("enter");
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
        {data.icon ? data.icon : <FontAwesomeIcon icon={faList} />}
      </span>
      {!editable ? (
        <span className={styles["title"]}>{data.title}</span>
      ) : (
        <input
          type="text"
          className={styles["input-list-name"]}
          value={listName}
          onChange={(e) => handelChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            onBlur();
            handleUpdateList(data);
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
