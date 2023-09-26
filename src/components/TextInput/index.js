import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./TextInput.module.scss";
import {
  faBell,
  faCalendar,
} from "@fortawesome/free-regular-svg-icons";
import { faPlus, faRepeat } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";
import { default as MenuPopper } from "../Popper/Menu";
import { DUE_MENU_POPPER, REMIND_MENU_POPPER, REPEAT_MENU_POPPER } from "../../store/constraints";

function TextInput({ planOptions, placeholder="Add a task", icon=<FontAwesomeIcon icon={faPlus} />}) {
  return (
    <div className={styles["wrapper"]}>
      {icon}
      <input type="text" placeholder={placeholder}/>
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

export default TextInput;
