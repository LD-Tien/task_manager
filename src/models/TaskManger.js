import Task from "../models/Task";
import { MODAL_DATA_SERVER_ERROR } from "../store/modalData";
import TasksList from "./TasksList";
import { auth } from "../firebase";
class TaskManger {
  constructor() {
    let allTask = [];
    let allList = [];
    let tasksNoList = [];
    this.sortMode = "Creation Date";
    this.searchKeywords = "";
    this.tasksSearched = [];
    this.confirmModalData = {
      title: undefined,
      body: undefined,
      confirmContent: undefined,
      confirmType: undefined,
      cancelContent: undefined,
      onClickConfirm: undefined,
      onClickCancel: undefined,
    };

    this.getIdToken = async () => {
      const currentUser = auth.currentUser;
      try {
        const token = await currentUser.getIdToken();
        return token;
      } catch (error) {
        taskManager.showModalServerError("Error", error.message);
      }
    };

    this.showModalServerError = (errorTitle, errorBody) => {
      this.confirmModalData = MODAL_DATA_SERVER_ERROR;
      if (errorTitle) {
        this.confirmModalData.title = errorTitle;
      }
      if (errorBody) {
        this.confirmModalData.body = errorBody;
      }
      this.confirmModalData.onClickConfirm = () => {
        window.location.reload();
      };
      this.setShowModalConfirm(true);
      return { code: 500 };
    };

    this.getDataFromAPI = async () => {
      const token = await this.getIdToken();
      await fetch("/getLists", {
        headers: {
          authorization: token,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.code === 200) {
            this.setAllList(result.data);
          }
        })
        .catch((error) => {
          console.log(error);
          return this.showModalServerError();
        });

      await fetch("/getTasks", {
        headers: {
          authorization: token,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.code === 200) {
            this.setAllTask(result.data);
          }
        })
        .catch(() => {
          return this.showModalServerError();
        });
    };

    this.createId = () => {
      return Date.now().toString(36) + Math.random().toString(36);
    };

    this.sortTask = (mode) => {
      switch (mode) {
        case "Alphabet":
          if (allTask.length > 1) {
            allTask.sort((a, b) => {
              if (a.title < b.title) {
                return -1;
              }
              return 1;
            });
          }
          break;
        case "Due Date":
          if (allTask.length > 1) {
            allTask.sort((a, b) => {
              if (a.planned && b.planned) {
                return new Date(a.planned) - new Date(b.planned);
              } else {
                if (!a.planned && !b.planned) {
                  return 0;
                } else if (!a.planned) {
                  return 1;
                } else {
                  return -1;
                }
              }
            });
          }
          break;
        case "Creation Date":
          if (allTask.length > 1) {
            allTask.sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            });
          }
          break;
        default:
          break;
      }
    };

    this.searchTasks = (keywords) => {
      if (keywords) {
        this.searchKeywords = keywords;
      }
      this.tasksSearched = [...allTask].filter((task) => {
        return task.title.includes(this.searchKeywords);
      });
    };

    this.setAllList = (lists) => {
      if (lists.length !== 0) {
        allList = lists.map((list) => {
          return new TasksList({ list: list });
        });
      }
    };

    this.getAllList = () => {
      allList = [...allList];
      return allList;
    };

    this.addList = (list) => {
      allList.push(list);
    };

    this.deleteList = (listDelete) => {
      allList = allList.filter((list) => list._id !== listDelete._id);
    };

    this.setAllTask = (tasks) => {
      allList.map((list) => {
        return list.setTasks(tasks);
      });
      tasksNoList = tasks
        .map((task) => {
          if (!task.listId) {
            return new Task(task);
          }
          return null;
        })
        .filter((task) => task);
      allTask.push(tasksNoList);
    };

    this.getAllTask = () => {
      allTask = allList.reduce((tasks, list) => {
        return tasks.concat(list.tasks);
      }, []);

      allTask = allTask.concat(tasksNoList);
      this.sortTask(this.sortMode);
      return allTask;
    };

    this.addTask = (task) => {
      if (task.listId) {
        allList.every((list) => {
          if (list._id === task.listId) {
            list.tasks.unshift(task);
            return false;
          }
          return true;
        });
      } else {
        tasksNoList.unshift(task);
      }
    };

    this.deleteTask = (task) => {
      if (task.listId) {
        allList.every((list) => {
          if (list._id === task.listId) {
            list.tasks = list.tasks.filter((item) => item._id !== task._id);
            return false;
          }
          return true;
        });
      } else {
        tasksNoList = tasksNoList.filter((item) => item._id !== task._id);
      }
    };
  }
}
const taskManager = new TaskManger();
export default taskManager;
