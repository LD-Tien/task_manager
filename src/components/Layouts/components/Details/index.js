import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../../Button";
import TaskItem from "../../../TaskItem";
import BottomBar from "./BottomBar";
import styles from "./Details.module.scss";
import GroupItem from "./GroupItem";
import { faPaperclip, faRotate } from "@fortawesome/free-solid-svg-icons";
import {
  faBell,
  faCalendarDays,
  faFile,
  faSun,
} from "@fortawesome/free-regular-svg-icons";
import Note from "../../../Note";
import { default as MenuPopper } from "../../../Popper/Menu";
import { REMIND_MENU_POPPER, DUE_MENU_POPPER, REPEAT_MENU_POPPER } from "../../../../store/constraints";
import TextInput from "../../../TextInput";


function Details({ task }) {
  return (
    <div className={styles["wrapper"]}>
      <div>
        <TaskItem key={task._id} editable data={task} />
      </div>
      <GroupItem>
        {task.subTasks.map((subTask) => {
          return <TaskItem key={subTask._id} editable isSubTask data={subTask} />;
        })}
        <TextInput />
      </GroupItem>
      <GroupItem>
        <Button leftIcon={<FontAwesomeIcon icon={faSun} />} item isActive>
          Add to My Day
        </Button>
      </GroupItem>
      <GroupItem>
        <MenuPopper trigger="click" items={REMIND_MENU_POPPER}>
          <div>
            <Button leftIcon={<FontAwesomeIcon icon={faBell} />} item>
              Remind me
            </Button>
          </div>
        </MenuPopper>
        <MenuPopper trigger="click" items={DUE_MENU_POPPER}>
          <div>
            <Button leftIcon={<FontAwesomeIcon icon={faCalendarDays} />} item>
              19/09/2023
            </Button>
          </div>
        </MenuPopper>
        <MenuPopper trigger="click" items={REPEAT_MENU_POPPER}>
          <div>
            <Button leftIcon={<FontAwesomeIcon icon={faRotate} />} item>
              Repeat
            </Button>
          </div>
        </MenuPopper>
      </GroupItem>
      <GroupItem>
        <Button
          href="https://i.pinimg.com/236x/26/9d/26/269d26a593e197ef1909622544f512fe.jpg"
          leftIcon={<FontAwesomeIcon icon={faFile} />}
          item
          isFile
        >
          Image 1.png
        </Button>
        <Button leftIcon={<FontAwesomeIcon icon={faPaperclip} />} item>
          Add file
        </Button>
      </GroupItem>
      <GroupItem>
        <Note />
      </GroupItem>
      <BottomBar />
    </div>
  );
}

export default Details;
