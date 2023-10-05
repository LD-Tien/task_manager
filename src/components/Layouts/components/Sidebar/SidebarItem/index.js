import { useState } from "react";
import styles from "./SidebarItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

function SidebarItem({
  isActive,
  onClick,
  editable = false,
  onBlur = () => {},
  data,
}) {
  const [listName, setListName] = useState(data.title);

  function handelChange(input) {
    setListName(input);
  }

  function handleUpdateList() {
    const listNameUpdate = listName.trim();

    //validate
    if (listNameUpdate === "" || listNameUpdate === data.title) {
      setListName(data.title);
      return;
    }

    fetch(`/updateList/${data._id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title: listNameUpdate }),
    }).then((res) => {
      if (res.status === 200) {
        setListName(listNameUpdate);
        data.title = listNameUpdate;
      }
    });
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleUpdateList(data);
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
        {data.icon ? data.icon : <FontAwesomeIcon icon={faList} />}
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
