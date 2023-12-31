import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faCalendarPlus,
  faClock,
  faStar,
  faSun,
  faTrashCan,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import {
  faArrowDownAZ,
  faCircleHalfStroke,
  faICursor,
  faListCheck,
  faMagnifyingGlass,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import taskManager from "../models/TaskManger";
import { MODAL_DATA_DELETE_LIST, MODAL_DATA_DELETE_TASK } from "./modalData";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

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
          task.planned = moment()
            .set({ hour: 0, minute: 0, second: 0 })
            .format();
          handleUpdate();
        },
      },
      {
        leftIcon: <FontAwesomeIcon icon={faCalendar} />,
        title: "Tomorrow",
        subTitle: moment().add(1, "days").format("ddd"),
        onClick: function ({ task, handleUpdate }) {
          task.planned = moment()
            .set({ hour: 0, minute: 0, second: 0 })
            .add(1, "day")
            .format();
          handleUpdate();
        },
      },
      {
        leftIcon: <FontAwesomeIcon icon={faCalendar} />,
        title: "Next week",
        subTitle: "Mon",
        onClick: function ({ task, handleUpdate }) {
          task.planned = moment()
            .set({ hour: 0, minute: 0, second: 0 })
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
          taskManager.confirmModalData = MODAL_DATA_DELETE_TASK;
          taskManager.confirmModalData.title = `Task "${task.title}" will be permanently deleted`;
          taskManager.confirmModalData.onClickConfirm = () => {
            taskManager.deleteTask(task);
            taskManager.setTasks(taskManager.getAllTask());
            taskManager.searchTasks();
            taskManager.setTaskActive({ taskId: -1 });

            task.deleteTask().then((result) => {
              if (result.code === 400) {
                taskManager.addTask(task);
                taskManager.setTasks(taskManager.getAllTask());
                taskManager.showModalServerError(result.message);
              }
            });
          };
          taskManager.setShowModalConfirm(true);
        },
      },
    ],
  },
];

export const SIDEBAR_DEFAULT_ITEM = [
  {
    listId: "MyDay",
    leftIcon: <FontAwesomeIcon icon={faSun} />,
    title: "My Day",
  },
  {
    listId: "Important",
    leftIcon: <FontAwesomeIcon icon={faStar} />,
    title: "Important",
  },
  {
    listId: "Planned",
    leftIcon: <FontAwesomeIcon icon={faCalendar} />,
    title: "Planned",
  },
  {
    listId: "Tasks",
    leftIcon: <FontAwesomeIcon icon={faListCheck} />,
    title: "Tasks",
  },
];

export const SEARCH_LIST = {
  listId: "Search",
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
          taskManager.setEditableListId(list.listId);
        },
      },
      // {
      //   leftIcon: <FontAwesomeIcon icon={faClone} />,
      //   title: "Duplicate list",
      //   disable: true,
      // },
    ],
  },

  {
    options: [
      {
        leftIcon: <FontAwesomeIcon icon={faTrashCan} />,
        title: "Delete list",
        danger: true,
        onClick: async function ({ list, navigate }) {
          taskManager.confirmModalData = MODAL_DATA_DELETE_LIST;
          taskManager.confirmModalData.title = `List "${list.title}" will be permanently deleted`;
          taskManager.confirmModalData.onClickConfirm = () => {
            taskManager.deleteList(list);
            taskManager.setUserLists(taskManager.getAllList());
            taskManager.setListActive(SIDEBAR_DEFAULT_ITEM[0]);
            navigate(-1);
            list.deleteList().then((result) => {
              if (result.code === 200) {
                list.setList(result.data);
              } else if (result.code === 400) {
                taskManager.showModalServerError(result.message);
              }
            });
          };
          taskManager.setShowModalConfirm(true);
        },
      },
    ],
  },
];

export const ACCOUNT_MENU = [
  {
    options: [
      {
        title: "Account",
        leftIcon: <FontAwesomeIcon icon={faUser} />,
        onClick: function ({ showModalAccount }) {
          showModalAccount(true);
        },
      },
      {
        title: "Dark / Light",
        leftIcon: <FontAwesomeIcon icon={faCircleHalfStroke} />,
        onClick: function () {
          const root = document.querySelector("html");
          const dataTheme = root.getAttribute("data-theme");
          if (dataTheme === "dark") {
            root.setAttribute("data-theme", "light");
            localStorage.setItem("data-theme", "light");
          } else {
            root.setAttribute("data-theme", "dark");
            localStorage.setItem("data-theme", "dark");
          }
        },
      },
    ],
  },
  {
    options: [
      {
        leftIcon: <FontAwesomeIcon icon={faRightFromBracket} />,
        title: "Log out",
        danger: true,
        onClick: function () {
          signOut(auth).then(() => {
            window.location.href = "/login";
          });
        },
      },
    ],
  },
];
