// import './style.css';
// import { isToday, isThisWeek } from 'date-fns';

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
  get name() {
    return this.name;
  },
};

const projectObj = (name) => {
  this.name = name;
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
  this.title = title;
  this.desc = desc;
  this.dueDate = dueDate;
  this.priority = priority;
  return Object.create(toDoProto);
};

const DOMcontroller = (() => {
  const content = document.querySelector('.content');

  function addInput() {
    const div = document.createElement('div');
    div.innerHTML = `<form action="#">
        <div id="input-container">
          <input type="text" name="title" placeholder="Title: Buy Groceries" required/>
          <textarea name="desc" id="desc-input" placeholder="Details: "></textarea>
          <input type="date" name="dueDate" required/>
          <select name="priority" id="priority-input" required>
            <option value="" disabled selected>Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input type="submit" value= "Add" id="submit-button"/>
        </div>`;
    content.appendChild(div);
    const form = document.querySelector('form');
    form.addEventListener('submit', handleSubmit);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    console.log(formProps);
  }

  function addProject(projectObj) {
    const li = document.createElement('li');
    const container = document.querySelector('#project-container');
    li.textContent = projectObj.name;
    li.classList.add('project');
    container.appendChild(li);
  }

  function removeProject() {}

  function addToDo() {
    const div = document.createElement('div');
    div.setAttribute('data-priority', priority);
  }

  function removeToDo() {}

  function updateToDo() {}

  function changeTab() {}

  return { addInput, handleSubmit };
})();

const MasterControl = (() => {
  function newToDo() {
    // Add todo using projectObj and DOM controller add
  }

  function removeToDo() {
    //Remove todo using projectObj and DOM controller remove
  }

  function newProject() {
    //New project Obj and DOMcontroller add to sidebar
  }

  function changePriority() {
    //ToDoObj.setPriority and update through DOMcontroller
  }

  function readInput() {
    return {};
  }
})();

// ToDo can have data-key according to index in project arr to identify itself

// Event listener on sidebar with e.target to know which project is clicked

// Need default project when opening site

// Hitting enter creates the todo and the edge of it should have check and cross to confirm/cancel adding

// Empty input at the end of list to be able to add a todo

// Filter todo by priority

// Check that project doesn't already exist

DOMcontroller.addInput();
