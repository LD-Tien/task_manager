import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddTask from "../../../AddTask";
import Button from "../../../Button";
import TaskItem from "../../../TaskItem";
import BottomBar from "./BottomBar";
import styles from "./Details.module.scss";
import GroupItem from "./GroupItem";
import { faPaperclip, faRotate } from "@fortawesome/free-solid-svg-icons";
import {
  faBell,
  faCalendar,
  faCalendarDays,
  faClock,
  faFile,
  faSun,
} from "@fortawesome/free-regular-svg-icons";
import Note from "../../../Note";
import { default as MenuPopper } from "../../../Popper/Menu";

const remind = [
  { headerTitle: "Reminder" },
  {
    options: [
      {
        icon: <FontAwesomeIcon icon={faClock} />,
        title: "Later today",
        subTitle: "",
        color: "",
      },
      {
        icon: <FontAwesomeIcon icon={faClock} />,
        title: "Tomorrow",
        subTitle: "Sun, 9 AM",
        color: "",
      },
      {
        icon: <FontAwesomeIcon icon={faClock} />,
        title: "Later today",
        subTitle: "Sun, 9 AM",
        color: "",
      },
    ],
  },
  {
    customOptions: {
      icon: <FontAwesomeIcon icon={faClock} />,
      title: "Pick a date & time",
    },
  },
];

const due = [
  {headerTitle : "Due"},
  {options: [
    {
      icon: <FontAwesomeIcon icon={faCalendar}/>,
      title: "Today",
      subTitle: "Sun",
      color: "",
    },
    {
      icon: <FontAwesomeIcon icon={faCalendar}/>,
      title: "Tomorrow",
      subTitle: "Mon",
      color: "",
    },
    {
      icon: <FontAwesomeIcon icon={faCalendar}/>,
      title: "Next week",
      subTitle: "Mon",
      color: "",
    }
  ]},
  {customOptions: {
    icon: <FontAwesomeIcon icon={faCalendar}/>,
    title: "Pick a date",
    color: ""
  }}
]

const repeat = [
  {headerTitle : "Repeat"},
  {options: [
    {
      icon: <FontAwesomeIcon icon={faCalendar}/>,
      title: "Daily",
    },
    {
      icon: <FontAwesomeIcon icon={faCalendar}/>,
      title: "Weekdays",
    },
    {
      icon: <FontAwesomeIcon icon={faCalendar}/>,
      title: "Weekly",
    },
    {
      icon: <FontAwesomeIcon icon={faCalendar}/>,
      title: "Monthly",
    },
    {
      icon: <FontAwesomeIcon icon={faCalendar}/>,
      title: "Yearly",
    }
  ]},
  {customOptions: {
    icon: <FontAwesomeIcon icon={faCalendar}/>,
    title: "Custom",
  }}
]

function Details({ task }) {
  return (
    <div className={styles["wrapper"]}>
      <div>
        <TaskItem editable {...task} />
      </div>
      <GroupItem>
        {task.subTasks.map((subTask, index) => {
          return <TaskItem key={index} editable isSubTask {...subTask} />;
        })}
        <AddTask />
      </GroupItem>
      <GroupItem>
        <Button leftIcon={<FontAwesomeIcon icon={faSun} />} item isActive>
          Add to My Day
        </Button>
      </GroupItem>
      <GroupItem>
        <MenuPopper trigger="click" items={remind}>
          <div>
            <Button leftIcon={<FontAwesomeIcon icon={faBell} />} item>
              Remind me
            </Button>
          </div>
        </MenuPopper>
        <MenuPopper trigger="click" items={due}>
          <div>
            <Button leftIcon={<FontAwesomeIcon icon={faCalendarDays} />} item>
              19/09/2023
            </Button>
          </div>
        </MenuPopper>
        <MenuPopper trigger="click" items={repeat}>
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
