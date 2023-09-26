import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./AddTask.module.scss";
import {
  faBell,
  faCalendar,
} from "@fortawesome/free-regular-svg-icons";
import { faPlus, faRepeat } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";
import { default as MenuPopper } from "../Popper/Menu";
import { DUE_MENU_POPPER, REMIND_MENU_POPPER, REPEAT_MENU_POPPER } from "../../store/constraints";

function AddTask({ planOptions }) {
  return (
    <div className={styles["wrapper"]}>
      <FontAwesomeIcon icon={faPlus} />
      <input type="text" placeholder="Add a task" />
      {planOptions ? (
        <div className={styles["plan-options"]}>
          <MenuPopper
            trigger="click"
            placement="bottom"
            items={DUE_MENU_POPPER}
          >
            <div>
              <Button leftIcon={<FontAwesomeIcon icon={faCalendar} />} small />
            </div>
          </MenuPopper>
          <MenuPopper
            trigger="click"
            placement="bottom"
            items={REMIND_MENU_POPPER}
          >
            <div>
              <Button leftIcon={<FontAwesomeIcon icon={faBell} />} small />
            </div>
          </MenuPopper>
          <MenuPopper
            trigger="click"
            placement="bottom"
            items={REPEAT_MENU_POPPER}
          >
            <div>
              <Button leftIcon={<FontAwesomeIcon icon={faRepeat} />} small />
            </div>
          </MenuPopper>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default AddTask;
