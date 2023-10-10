import taskManager from "./TaskManger";

class Note {
  constructor(noteData) {
    this.content = noteData.content;
    this.updatedAt = noteData.updatedAt;
  }
}

class SubTask {
  constructor(subTaskData) {
    this.title = subTaskData.title;
    this.isCompleted = subTaskData.isCompleted;
    this._id = subTaskData._id;
  }
}

class File {
  constructor(fileData) {
    this.firebaseName = fileData.firebaseName;
    this.name = fileData.name;
    this.type = fileData.type;
    this.downloadURL = fileData.downloadURL;
  }
}

class Task {
  constructor(data) {
    if (data) {
      this.note = new Note(data.note);
      this._id = data._id;
      this.title = data.title;
      this.subTasks = [];
      if (data.subTasks.length !== 0) {
        this.subTasks = data.subTasks.map(
          (subTaskData) => new SubTask(subTaskData)
        );
      }
      this.files = [];
      if (data.files.length !== 0) {
        this.files = data.files.map((fileData) => new File(fileData));
      }
      this.planned = data.planned;
      this.remind = data.remind;
      this.isSendNotification = data.isSendNotification;
      this.repeat = data.repeat;
      this.myDay = data.myDay;
      this.isImportant = data.isImportant;
      this.isCompleted = data.isCompleted;
      this.listId = data.listId;
      this.owner = data.owner;
      this.partners = data.partners;
      this.createdAt = data.createdAt;
      this.updatedAt = data.updatedAt;
    }

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
            },
            body: JSON.stringify(task),
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.code === 200) {
                taskManager.addTask(new Task(result.data));
              }
              return result;
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

          return await fetch(`/updateTask/${task._id}`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(task),
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.code === 200) {
              }
              return result;
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
          return await fetch(`/deleteTask/${task._id}`, {
            method: "DELETE",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(task),
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.code === 200) {
                taskManager.deleteTask(task);
              }
              return result;
            });
        },
        writable: false,
        configurable: false,
      },
      addSubTask: {
        value: async (subTaskTitle) => {
          return await fetch(`/addSubTask/${this._id}`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ title: subTaskTitle, isCompleted: false }),
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.code === 200) {
                this.subTasks.push(new SubTask(result.data));
              }
              return result;
            });
        },
        writable: false,
        configurable: false,
      },
      updateSubTask: {
        value: async (subTask) => {
          return await fetch(`/updateSubTask/${this._id}/${subTask._id}`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(subTask),
          })
            .then((res) => res.json())
            .then((result) => {
              return result;
            });
        },
        writable: false,
        configurable: false,
      },

      deleteSubTask: {
        value: async (subTask) => {
          return await fetch(`/deleteSubtask/${this._id}/${subTask._id}`, {
            method: "PUT",
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.code === 200) {
                this.subTasks = this.subTasks.filter(
                  (item) => item._id !== subTask._id
                );
              }
              return result;
            });
        },
        writable: false,
        configurable: false,
      },
    });
  }
}

export default Task;
