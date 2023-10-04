import SidebarItem from "./SidebarItem";
import styles from "./Sidebar.module.scss";
import TextInput from "../../../TextInput";
import { default as MenuPopper } from "../../../Popper/Menu";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faICursor } from "@fortawesome/free-solid-svg-icons";
import { faClone, faTrashCan } from "@fortawesome/free-regular-svg-icons";

function Sidebar({
  listActive,
  setListActive,
  defaultList = [],
  userLists = [],
  setUserLists,
}) {
  const [newList, setNewList] = useState("");
  const [editableListId, setEditableListId] = useState("");

  function handleClick(listActive) {
    setListActive(listActive);
  }

  function handleChange(input) {
    setNewList(input);
  }

  function handleAddNewList(e) {
    e.preventDefault();
    fetch("/addNewList", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ title: newList }),
    })
      .then((res) => res.json())
      .then((list) => {
        setUserLists([...userLists, list]);
        setNewList("");
        setListActive(list);
      });
  }

  function renderUserLists(usrLists) {
    return userLists.map((item) => {
      return (
        <MenuPopper
          key={item._id}
          trigger="contextmenu"
          placement="bottom"
          items={[
            {
              options: [
                {
                  icon: <FontAwesomeIcon icon={faICursor} />,
                  title: "Rename list",
                  onClick: function () {
                    setEditableListId(item._id);
                  },
                },
                {
                  icon: <FontAwesomeIcon icon={faClone} />,
                  title: "Duplicate list",
                },
              ],
            },

            {
              options: [
                {
                  icon: <FontAwesomeIcon icon={faTrashCan} />,
                  title: "Delete list",
                  danger: true,
                  onClick: async function () {
                    await fetch(`/deleteList/${item._id}`, {
                      method: "DELETE",
                    }).then((res) => {
                      if (res.status === 200) {
                        setUserLists([
                          ...userLists.filter(
                            (value) => value._id !== item._id
                          ),
                        ]);
                        setListActive(defaultList[0]);
                      }
                    });
                  },
                },
              ],
            },
          ]}
        >
          <div>
            <SidebarItem
              key={item._id}
              data={item}
              isActive={item._id === listActive._id}
              editable={editableListId === item._id}
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
        <form method="POST" onSubmit={handleAddNewList}>
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
