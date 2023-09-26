import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faCheckCircle,
  faClock,
  faClone,
  faCopy,
  faStar,
  faSun,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { faICursor, faListCheck } from "@fortawesome/free-solid-svg-icons";

export const REMIND_MENU_POPPER = [
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

export const DUE_MENU_POPPER = [
  { headerTitle: "Due" },
  {
    options: [
      {
        icon: <FontAwesomeIcon icon={faCalendar} />,
        title: "Today",
        subTitle: "Sun",
        color: "",
      },
      {
        icon: <FontAwesomeIcon icon={faCalendar} />,
        title: "Tomorrow",
        subTitle: "Mon",
        color: "",
      },
      {
        icon: <FontAwesomeIcon icon={faCalendar} />,
        title: "Next week",
        subTitle: "Mon",
        color: "",
      },
    ],
  },
  {
    customOptions: {
      icon: <FontAwesomeIcon icon={faCalendar} />,
      title: "Pick a date",
      color: "",
    },
  },
];

export const REPEAT_MENU_POPPER = [
  { headerTitle: "Repeat" },
  {
    options: [
      {
        icon: <FontAwesomeIcon icon={faCalendar} />,
        title: "Daily",
      },
      {
        icon: <FontAwesomeIcon icon={faCalendar} />,
        title: "Weekdays",
      },
      {
        icon: <FontAwesomeIcon icon={faCalendar} />,
        title: "Weekly",
      },
      {
        icon: <FontAwesomeIcon icon={faCalendar} />,
        title: "Monthly",
      },
      {
        icon: <FontAwesomeIcon icon={faCalendar} />,
        title: "Yearly",
      },
    ],
  },
  {
    customOptions: {
      icon: <FontAwesomeIcon icon={faCalendar} />,
      title: "Custom",
    },
  },
];

export const CONTEXT_MENU_TASK = [
  {
    options: [
      {
        icon: <FontAwesomeIcon icon={faSun} />,
        title: "Add to My Day",
      },
      {
        icon: <FontAwesomeIcon icon={faStar} />,
        title: "Mark as important",
      },
      {
        icon: <FontAwesomeIcon icon={faCheckCircle} />,
        title: "Mark as completed",
      },
    ],
  },
  {
    options: [
      {
        icon: <FontAwesomeIcon icon={faCalendar} />,
        title: "Due today",
      },
      {
        icon: <FontAwesomeIcon icon={faCalendar} />,
        title: "Due tomorrow",
      },
    ],
  },
  {
    options: [
      {
        icon: <FontAwesomeIcon icon={faListCheck} />,
        title: "Create new list from this task",
      },
      {
        icon: <FontAwesomeIcon icon={faListCheck} />,
        title: "Move task to...",
      },
      {
        icon: <FontAwesomeIcon icon={faCopy} />,
        title: "Copy task to...",
      },
    ],
  },
  {
    options: [
      {
        icon: <FontAwesomeIcon icon={faTrashCan} />,
        title: "Delete task",
        danger: true,
      },
    ],
  },
];

export const CONTEXT_MENU_USER_LIST = [
  {
    options: [
      { icon: <FontAwesomeIcon icon={faICursor} />, title: "Rename list" },
      { icon: <FontAwesomeIcon icon={faClone} />, title: "Duplicate list" },
    ],
  },

  {
    options: [
      {
        icon: <FontAwesomeIcon icon={faTrashCan} />,
        title: "Delete list",
        danger: true,
      },
    ],
  },
];

export const SIDEBAR_DEFAULT_ITEM = [
  { _id: "MyDay", icon: <FontAwesomeIcon icon={faSun} />, title: "My Day" },
  {
    _id: "Important",
    icon: <FontAwesomeIcon icon={faStar} />,
    title: "Important",
  },
  {
    _id: "Planned",
    icon: <FontAwesomeIcon icon={faCalendar} />,
    title: "Planned",
  },
  {
    _id: "Tasks",
    icon: <FontAwesomeIcon icon={faListCheck} />,
    title: "Tasks",
  },
];
