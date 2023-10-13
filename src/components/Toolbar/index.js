import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Toolbar.module.scss";
import Button from "../Button";

import { default as MenuPopper } from "../Popper/Menu";
import { SORT_ITEM } from "../../store/constraints";
import taskManager from "../../models/TaskManger";

function Toolbar({ title, icon }) {
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["title"]}>
        {icon}
        <p>{title}</p>
        {/* <Button leftIcon={<FontAwesomeIcon icon={faEllipsis} />} small></Button> */}
      </div>
      <MenuPopper trigger="click" items={SORT_ITEM}>
        <div>
          <Button leftIcon={<FontAwesomeIcon icon={faFilter} />} small>
            Sort tasks by {taskManager.sortMode.toLowerCase()}
          </Button>
        </div>
      </MenuPopper>
    </div>
  );
}

export default Toolbar;
