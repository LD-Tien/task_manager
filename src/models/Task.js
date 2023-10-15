import taskManager from "./TaskManger";

class Note {
  constructor(noteData) {
    this.content = noteData.content;
    this.updatedAt = noteData.updatedAt;
  }
}

export { Note };

class SubTask {
  constructor(subTaskData) {
    this.subTaskId = subTaskData.subTaskId;
    this.title = subTaskData.title;
    this.isCompleted = subTaskData.isCompleted;
  }
}

export { SubTask };

class File {
  constructor(fileData) {
    this.firebaseName = fileData.firebaseName;
    this.name = fileData.name;
    this.type = fileData.type;
    this.downloadURL = fileData.downloadURL;
  }
}

export { File };

class Task {
  constructor(data) {
    this.setTask = (task) => {
      if (task) {
        this.note = new Note(task.note);
        this._id = task._id;
        this.taskId = task.taskId;
        this.title = task.title;
        this.subTasks = [];
        if (task.subTasks.length !== 0) {
          this.subTasks = task.subTasks.map(
            (subTasktask) => new SubTask(subTasktask)
          );
        }
        this.files = [];
        if (task.files.length !== 0) {
          this.files = task.files.map((filetask) => new File(filetask));
        }
        this.planned = task.planned;
        this.remind = task.remind;
        this.isSendNotification = task.isSendNotification;
        this.repeat = task.repeat;
        this.myDay = task.myDay;
        this.isImportant = task.isImportant;
        this.isCompleted = task.isCompleted;
        this.listId = task.listId;
        this.owner = task.owner;
        this.partners = task.partners;
        this.createdAt = task.createdAt;
        this.updatedAt = task.updatedAt;
      }
    };

    Object.defineProperties(this, {
      addTask: {
        value: async (task) => {
          if (!task) {
            task = this;
          }

          return await fetch("/addTask", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: await taskManager.getIdToken(),
            },
            body: JSON.stringify(task),
          })
            .then((res) => res.json())
            .catch(() => {
              return taskManager.showModalServerError();
            });
        },
        writable: false,
        configurable: false,
      },
      updateTask: {
        value: async (task) => {
          if (!task) {
            task = this;
          }

          return await fetch(`/updateTask/${task.taskId}`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
              authorization: await taskManager.getIdToken(),
            },
            body: JSON.stringify(task),
          })
            .then((res) => res.json())
            .catch(() => {
              return taskManager.showModalServerError();
            });
        },
        writable: false,
        configurable: false,
      },
      deleteTask: {
        value: async (task) => {
          if (!task) {
            task = this;
          }
          return await fetch(`/deleteTask/${task.taskId}`, {
            method: "DELETE",
            headers: {
              "content-type": "application/json",
              authorization: await taskManager.getIdToken(),
            },
            body: JSON.stringify(task),
          })
            .then((res) => res.json())
            .catch(() => {
              return taskManager.showModalServerError();
            });
        },
        writable: false,
        configurable: false,
      },
      addSubTask: {
        value: async (subTask) => {
          return await fetch(`/addSubTask/${this.taskId}`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
              authorization: await taskManager.getIdToken(),
            },
            body: JSON.stringify(subTask),
          })
            .then((res) => res.json())
            .catch(() => {
              return taskManager.showModalServerError();
            });
        },
        writable: false,
        configurable: false,
      },
      updateSubTask: {
        value: async (subTask) => {
          return await fetch(
            `/updateSubTask/${this.taskId}/${subTask.subTaskId}`,
            {
              method: "PUT",
              headers: {
                "content-type": "application/json",
                authorization: await taskManager.getIdToken(),
              },
              body: JSON.stringify(subTask),
            }
          )
            .then((res) => res.json())
            .catch(() => {
              return taskManager.showModalServerError();
            });
        },
        writable: false,
        configurable: false,
      },

      deleteSubTask: {
        value: async (subTask) => {
          return await fetch(
            `/deleteSubtask/${this.taskId}/${subTask.subTaskId}`,
            {
              method: "PUT",
              headers: {
                authorization: await taskManager.getIdToken(),
              },
            }
          )
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
      this.setTask(data);
    }
  }
}

export default Task;
