import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faCalendarPlus,
  faCheckCircle,
  faClock,
  faClone,
  faCopy,
  faStar,
  faSun,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import {
  faArrowDownAZ,
  faICursor,
  faListCheck,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import taskManager from "../models/TaskManger";
import { icon } from "@fortawesome/fontawesome-svg-core";

export const SORT_ITEM = [
  { headerTitle: "Sort by" },
  {
    options: [
      {
        leftIcon: <FontAwesomeIcon icon={faCalendar} />,
        title: "Due date",
        onClick: () => {
          taskManager.sortMode = "Due Date";
          taskManager.setTasks(taskManager.getAllTask());
        },
        // disable: true,
      },
      {
        leftIcon: <FontAwesomeIcon icon={faArrowDownAZ} />,
        title: "Alphabetically",
        onClick: () => {
          taskManager.sortMode = "Alphabet";
          taskManager.setTasks(taskManager.getAllTask());
        },
      },
      {
        leftIcon: <FontAwesomeIcon icon={faCalendarPlus} />,
        title: "Creation date",
        onClick: () => {
          taskManager.sortMode = "Creation Date";
          taskManager.setTasks(taskManager.getAllTask());
        },
        // disable: true
      },
    ],
  },
];

export const REMIND_MENU_POPPER = [
  { headerTitle: "Reminder" },
  {
    options: [
      {
        leftIcon: <FontAwesomeIcon icon={faClock} />,
        title: "3 hours later",
        disable: false,
        onClick: function ({ task, handleUpdate, setRemind }) {
          if (setRemind) {
            // set remind for new task
            setRemind(moment().add(3, "hours").calendar());
            return;
          }
          // update
          task.isSendNotification = false;
          task.remind = moment().add(3, "hours").format();
          handleUpdate();
        },
      },
      {
        leftIcon: <FontAwesomeIcon icon={faClock} />,
        title: "Tomorrow",
        subTitle: `${moment().add(1, "day").format("ddd[,]")} 9 AM`,
        onClick: function ({ task, handleUpdate, setRemind }) {
          if (setRemind) {
            // set remind for new task
            setRemind(moment().add(3, "hours").calendar());
            return;
          }
          task.isSendNotification = false;
          task.remind = moment()
            .add(1, "day")
            .set({ hour: 9, minute: 0, second: 0 })
            .format();
          handleUpdate();
        },
      },
      {
        leftIcon: <FontAwesomeIcon icon={faClock} />,
        title: "Next week",
        subTitle: "Mon, 9 AM",
        onClick: function ({ task, handleUpdate, setRemind }) {
          if (setRemind) {
            // set remind for new task
            setRemind(moment().add(3, "hours").calendar());
            return;
          }

          task.isSendNotification = false;
          task.remind = moment()
            .set({ hour: 9, minute: 0, second: 0 })
            .add(8 - moment().isoWeekday(), "days")
            .format();
          handleUpdate();
        },
      },
    ],
  },
  {
    customOptions: {
      leftIcon: <FontAwesomeIcon icon={faClock} />,
      title: "Pick a date & time",
      inputDateHidden: (
        <input
          id="input-picker"
          type="datetime-local"
          style={{
            width: "0px",
            height: "0px",
            border: "none",
          }}
        />
      ),
    },
  },
];

export const DUE_MENU_POPPER = [
  { headerTitle: "Due" },
  {
    options: [
      {
        leftIcon: <FontAwesomeIcon icon={faCalendar} />,
        title: "Today",
        subTitle: moment().format("ddd"),
        onClick: function ({ task, handleUpdate }) {
          task.planned = moment().format();
          handleUpdate();
        },
      },
      {
        leftIcon: <FontAwesomeIcon icon={faCalendar} />,
        title: "Tomorrow",
        subTitle: moment().add(1, "days").format("ddd"),
        onClick: function ({ task, handleUpdate }) {
          task.planned = moment().add(1, "day").format();
          handleUpdate();
        },
      },
      {
        leftIcon: <FontAwesomeIcon icon={faCalendar} />,
        title: "Next week",
        subTitle: "Mon",
        onClick: function ({ task, handleUpdate }) {
          task.planned = moment()
            .add(8 - moment().isoWeekday(), "days")
            .format();
          handleUpdate();
        },
      },
    ],
  },
  {
    customOptions: {
      leftIcon: <FontAwesomeIcon icon={faCalendar} />,
      title: "Pick a date",
      color: "",
      inputDateHidden: (
        <input
          id="input-picker"
          type="date"
          style={{
            width: "0px",
            height: "0px",
            border: "none",
          }}
        />
      ),
    },
  },
];

// export const REPEAT_MENU_POPPER = [
//   { headerTitle: "Repeat" },
//   {
//     options: [
//       {
//         leftIcon: <FontAwesomeIcon icon={faCalendar} />,
//         title: "Daily",
//       },
//       {
//         leftIcon: <FontAwesomeIcon icon={faCalendar} />,
//         title: "Weekdays",
//       },
//       {
//         leftIcon: <FontAwesomeIcon icon={faCalendar} />,
//         title: "Weekly",
//       },
//       {
//         leftIcon: <FontAwesomeIcon icon={faCalendar} />,
//         title: "Monthly",
//       },
//       {
//         leftIcon: <FontAwesomeIcon icon={faCalendar} />,
//         title: "Yearly",
//       },
//     ],
//   },
//   {
//     options: [
//       {
//         leftIcon: <FontAwesomeIcon icon={faCalendar} />,
//         title: "Custom",
//       },
//     ],
//   },
// ];

export const CONTEXT_MENU_TASK = [
  // {
  //   options: [
  //     {
  //       leftIcon: <FontAwesomeIcon icon={faSun} />,
  //       title: "Add to My Day",
  //     },
  //     {
  //       leftIcon: <FontAwesomeIcon icon={faStar} />,
  //       title: "Mark as important",
  //     },
  //     {
  //       leftIcon: <FontAwesomeIcon icon={faCheckCircle} />,
  //       title: "Mark as completed",
  //     },
  //   ],
  // },
  // {
  //   options: [
  //     {
  //       leftIcon: <FontAwesomeIcon icon={faCalendar} />,
  //       title: "Due today",
  //     },
  //     {
  //       leftIcon: <FontAwesomeIcon icon={faCalendar} />,
  //       title: "Due tomorrow",
  //     },
  //   ],
  // },
  // {
  //   options: [
  //     {
  //       leftIcon: <FontAwesomeIcon icon={faListCheck} />,
  //       title: "Create new list from this task",
  //     },
  //     {
  //       leftIcon: <FontAwesomeIcon icon={faListCheck} />,
  //       title: "Move task to...",
  //     },
  //     {
  //       leftIcon: <FontAwesomeIcon icon={faCopy} />,
  //       title: "Copy task to...",
  //     },
  //   ],
  // },
  {
    options: [
      {
        leftIcon: <FontAwesomeIcon icon={faTrashCan} />,
        title: "Delete task",
        danger: true,
        onClick: function ({ task }) {
          task.deleteTask().then((result) => {
            if (result.code === 200) {
              taskManager.setTasks(taskManager.getAllTask());
              taskManager.setTaskActive({ _id: -1 });
            }
          });
        },
      },
    ],
  },
];

export const SIDEBAR_DEFAULT_ITEM = [
  { _id: "MyDay", leftIcon: <FontAwesomeIcon icon={faSun} />, title: "My Day" },
  {
    _id: "Important",
    leftIcon: <FontAwesomeIcon icon={faStar} />,
    title: "Important",
  },
  {
    _id: "Planned",
    leftIcon: <FontAwesomeIcon icon={faCalendar} />,
    title: "Planned",
  },
  {
    _id: "Tasks",
    leftIcon: <FontAwesomeIcon icon={faListCheck} />,
    title: "Tasks",
  },
];

export const SEARCH_LIST = {
  _id: "Search",
  leftIcon: <FontAwesomeIcon icon={faMagnifyingGlass} />,
  title: "Search for",
};

export const CONTEXT_MENU_LIST = [
  {
    options: [
      {
        leftIcon: <FontAwesomeIcon icon={faICursor} />,
        title: "Rename list",
        onClick: function ({ list }) {
          taskManager.setEditableListId(list._id);
        },
      },
      {
        leftIcon: <FontAwesomeIcon icon={faClone} />,
        title: "Duplicate list",
        disable: true,
      },
    ],
  },

  {
    options: [
      {
        leftIcon: <FontAwesomeIcon icon={faTrashCan} />,
        title: "Delete list",
        danger: true,
        onClick: async function ({ list }) {
          list.deleteList().then((result) => {
            if (result.code === 200) {
              taskManager.setUserLists(taskManager.getAllList());
              taskManager.setListActive(SIDEBAR_DEFAULT_ITEM[0]);
            }
          });
        },
      },
    ],
  },
];
