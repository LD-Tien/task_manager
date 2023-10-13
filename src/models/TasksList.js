import { MODAL_DATA_ERROR_SERVER } from "../store/modalData";
import Task from "./Task";
import taskManager from "./TaskManger";

class TasksList {
  constructor(data) {
    this.setList = (list) => {
      this.tasks = [];
      if (list) {
        this._id = list._id || "";
        this.title = list.title || "";
        this.owner = list.owner || "";
        this.icon = list.icon || "";
        this.updatedAt = list.updatedAt || "";
        this.createdAt = list.createdAt || "";
      }
    };

    Object.defineProperties(this, {
      setTasks: {
        value: (tasks) => {
          if (tasks.length !== 0) {
            this.tasks = tasks
              .map((task) => {
                if (task.listId === this._id) {
                  return new Task(task);
                }
                return null;
              })
              .filter((item) => item !== null);
          } else {
            this.tasks = [];
          }
        },
        writable: false,
        configurable: false,
      },
      addList: {
        value: async (title) => {
          return await fetch("/addNewList", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ title: title }),
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.code === 200) {
                this.setList(result.data);
                taskManager.addList(this);
              }
              return result;
            })
            .catch(() => {
              taskManager.confirmModalData = MODAL_DATA_ERROR_SERVER;
              taskManager.confirmModalData.onClickConfirm = () => {
                window.location.reload();
              };
              taskManager.setShowModalConfirm(true);
              return { code: 500 };
            });
        },
        writable: false,
        configurable: false,
      },
      updateList: {
        value: async (titleUpdate) => {
          return await fetch(`/updateList/${this._id}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ title: titleUpdate }),
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.code === 200) {
                this.title = titleUpdate;
              }
              return result;
            })
            .catch(() => {
              taskManager.confirmModalData = MODAL_DATA_ERROR_SERVER;
              taskManager.confirmModalData.onClickConfirm = () => {
                window.location.reload();
              };
              taskManager.setShowModalConfirm(true);
              return { code: 500 };
            });
        },
        writable: false,
        configurable: false,
      },
      deleteList: {
        value: async () => {
          return await fetch(`/deleteList/${this._id}`, {
            method: "DELETE",
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.code === 200) {
                taskManager.deleteList(this);
              }
              return result;
            })
            .catch(() => {
              taskManager.confirmModalData = MODAL_DATA_ERROR_SERVER;
              taskManager.confirmModalData.onClickConfirm = () => {
                window.location.reload();
              };
              taskManager.setShowModalConfirm(true);
              return { code: 500 };
            });
        },
        writable: false,
        configurable: false,
      },
    });
    if (data) {
      if (data.list) {
        this.setList(data.list);
      }
      if (data.tasks) {
        this.setTasks(data.tasks);
      }
    }
  }
}

export default TasksList;
