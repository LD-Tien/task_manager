import Task from "./Task";
import taskManager from "./TaskManger";

class TasksList {
  constructor(data) {
    this.setList = (list) => {
      this.tasks = [];
      if (list) {
        this._id = list.listId || "";
        this.listId = list.listId || "";
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
                if (task.listId === this.listId) {
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
        value: async () => {
          return await fetch("/addNewList", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              authorization: await taskManager.getIdToken(),
            },
            body: JSON.stringify({ listId: this.listId, title: this.title }),
          })
            .then((res) => res.json())
            .catch(() => {
              return taskManager.showModalServerError();
            });
        },
        writable: false,
        configurable: false,
      },
      updateList: {
        value: async () => {
          return await fetch(`/updateList/${this.listId}`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
              authorization: await taskManager.getIdToken(),
            },
            body: JSON.stringify({ title: this.title }),
          })
            .then((res) => res.json())
            .catch(() => {
              return taskManager.showModalServerError();
            });
        },
        writable: false,
        configurable: false,
      },
      deleteList: {
        value: async () => {
          return await fetch(`/deleteList/${this.listId}`, {
            method: "DELETE",
            headers: {
              authorization: await taskManager.getIdToken(),
            },
          })
            .then((res) => res.json())
            .catch(() => {
              return taskManager.showModalServerError();
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
