import './style.css';
import { isToday, isThisWeek } from 'date-fns';

const projectObjProto = {
  addToDoObj(toDoObj) {
    this.arr.push(toDoObj);
  },
  removeToDoObj(title) {
    for (let i = 0; i < this.arr.length; i++) {
      if (this.arr[i].title === title) {
        this.arr.splice(i, i);
        break;
      }
    }
  },
};

const projectObj = () => {
  let arr = [];
  return Object.create(projectObjProto);
};

const toDoProto = {
  get title() {
    return this.title;
  },
  get desc() {
    return this.desc;
  },
  get dueDate() {
    return this.dueDate;
  },
  get priority() {
    return this.priority;
  },
  set title(value) {
    this.title = value;
  },
  set desc(value) {
    this.desc = value;
  },
  set dueDate(value) {
    this.dueDate = value;
  },
  set priority(value) {
    this.priority = value;
  },
};

const toDoObj = (title, desc, dueDate, priority) => {
  let title = title;
  let desc = desc;
  let dueDate = dueDate;
  let priority = priority;
  return Object.create(toDoProto);
};

const DOMcontroller = (() => {
  function addProject() {}

  function removeProject() {}

  function addToDo() {}

  function removeToDo() {}

  function updateToDo() {}
})();

const MasterControl = (() => {
  function removeToDo() {
    //Remove todo using projectObj and DOM controller remove
  }

  function newProject() {
    //New project Obj and DOMcontroller add to sidebar
  }

  function changePriority() {
    //ToDoObj.setPriority and update through DOMcontroller
  }
})();

// ToDo can have data-key according to index in project arr to identify itself

// Event listener on sidebar with e.target to know which project is clicked

// Need default project when opening site

// Hitting enter creates the todo and the edge of it should have check and cross to confirm/cancel adding

// Empty input at the end of list to be able to add a todo

// Filter todo by priority

// Check that project doesn't already exist
