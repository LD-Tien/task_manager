import SidebarItem from "./SidebarItem";
import styles from "./Sidebar.module.scss";
import TextInput from "../../../TextInput";
import { default as MenuPopper } from "../../../Popper/Menu";
import { CONTEXT_MENU_USER_LIST } from "../../../../store/constraints";

function Sidebar({
  listActive,
  setListActive,
  defaultList = [],
  userList = [],
}) {
  
  function handleClick(listActive) {
    setListActive(listActive);
  }

  document.title = listActive.title;

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["default-list"]}>
        {defaultList.map((item) => {
          return (
            <SidebarItem
              key={item._id}
              {...item}
              isActive={item._id === listActive._id}
              onClick={handleClick}
            />
          );
        })}
      </div>

      <div className={styles["user-list"]}>
        {userList.map((item) => {
          return (
            <MenuPopper
              key={item._id}
              trigger="contextmenu"
              placement="bottom"
              items={CONTEXT_MENU_USER_LIST}
            >
              <div>
                <SidebarItem
                  key={item._id}
                  {...item}
                  isActive={item._id === listActive._id}
                  onClick={handleClick}
                />
              </div>
            </MenuPopper>
          );
        })}
        <TextInput placeholder="New list" />
      </div>
    </div>
  );
}

export default Sidebar;
