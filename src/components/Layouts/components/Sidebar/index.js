import SidebarItem from "./SidebarItem";
import styles from "./Sidebar.module.scss";
import { SIDEBAR_DEFAULT_ITEM } from "../../../../store/constraints";

function Sidebar({ idActive, setIdActive }) {
  function handleClick(idList) {
    setIdActive(idList);
  }

  return (
    <div className={styles["wrapper"]}>
      {SIDEBAR_DEFAULT_ITEM.map((item) => {
        return (
          <SidebarItem
            key={item.id}
            id={item.id}
            icon={item.icon}
            isActive={item.id === idActive}
            onClick={handleClick}
          >
            {item.title}
          </SidebarItem>
        );
      })}
      {/* <SidebarItem icon={<FontAwesomeIcon icon={faSun}/>}>My Day</SidebarItem>
        <SidebarItem icon={<FontAwesomeIcon icon={faStar}/>}>Important</SidebarItem>
        <SidebarItem icon={<FontAwesomeIcon icon={faCalendar}/>}>Planned</SidebarItem>
        <SidebarItem icon={<FontAwesomeIcon icon={faHouse}/>} isActive totalTasks={9}>Tasks</SidebarItem> */}
    </div>
  );
}

export default Sidebar;
