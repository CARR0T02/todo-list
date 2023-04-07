// import './style.css';
// import { isToday, isThisWeek } from 'date-fns';

const storage = (() => {
  function saveProject(projectObj) {
    localStorage.setItem(projectObj.getName(), JSON.stringify(projectObj));
  }

  function getProject(name) {
    return projectControl.loadProjectObj(
      JSON.parse(localStorage.getItem(name))
    );
  }

  function isEmpty(name) {
    return localStorage.getItem(name) === null;
  }

  return { saveProject, getProject, isEmpty };
})();

const projectControl = (() => {
  const projectObjProto = {
    addToDoObj(toDoObj) {
      this.arr.push(toDoObj);
    },
    removeToDoObj(title) {
      this.arr = this.arr.filter((search) => search === title);
    },
    getName() {
      return this.name;
    },
  };

  const createProjectObj = (name) => {
    let projectObj = Object.create(projectObjProto);
    projectObj.name = name;
    projectObj.arr = [];
    console.log(projectObj, '  createProjectObj method');
    return projectObj;
  };

  function loadProjectObj(projObj) {
    return Object.setPrototypeOf(projObj, projectObjProto);
  }
  return { createProjectObj, loadProjectObj };
})();

const DOMcontroller = (() => {
  const content = document.querySelector('.content');

  function addInput() {
    const div = document.createElement('div');
    div.setAttribute('id', 'input-container');
    div.innerHTML = `<form action="#">
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
          </form>`;
    content.appendChild(div);
  }

  function addProjectInput() {
    // const div = document.createElement('div');
    // div.setAttribute('id', 'project-input-container');
  }

  function addProject(projectObj) {
    const li = document.createElement('li');
    const container = document.querySelector('#project-container');
    li.textContent = projectObj.getName();
    li.classList.add('project');
    container.appendChild(li);
  }

  function removeProject() {}

  function addToDo(toDoObj) {
    const input = document.querySelector('#input-container');
    const toDoContainer = document.createElement('div');
    toDoContainer.setAttribute('data-priority', toDoObj.priority);
    toDoContainer.setAttribute('data-title', toDoObj.title);
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.classList.add('checkbox');
    const title = document.createElement('div');
    title.classList.add('todo-title');
    title.textContent = toDoObj.title;
    const desc = document.createElement('div');
    desc.classList.add('todo-desc');
    desc.textContent = toDoObj.desc;
    const dueDate = document.createElement('div');
    dueDate.textContent = toDoObj.dueDate;
    toDoContainer.appendChild(checkbox);
    toDoContainer.appendChild(title);
    toDoContainer.appendChild(desc);
    toDoContainer.appendChild(dueDate);
    content.insertBefore(toDoContainer, input);
  }

  function removeToDo(toDoObj) {
    // const toDoContainer = content.querySelector(`[data-key=${toDoObj.title}]`);
    // console.log(toDoContainer);
  }

  function updateToDo() {}

  function loadTab(projectObj) {
    let arr = projectObj.arr;
    for (const toDoObj of arr) {
      addToDo(toDoObj);
    }
  }

  return { addInput, addToDo, removeToDo, loadTab };
})();

const masterControl = (() => {
  let currentProject = 'Home';
  let currentProjectObj;
  function initialise() {
    if (storage.isEmpty('Home')) {
      let home = projectControl.createProjectObj('Home');
      storage.saveProject(home);
    }
    currentProjectObj = storage.getProject('Home');
    DOMcontroller.loadTab(currentProjectObj);
    console.log(currentProjectObj);
  }

  function newToDo(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const toDoObj = Object.fromEntries(formData);
    currentProjectObj.addToDoObj(toDoObj);
    storage.saveProject(currentProjectObj);
    DOMcontroller.addToDo(toDoObj);
  }

  function removeToDo() {
    //Remove todo using projectObj and DOM controller remove
  }

  function newProject() {
    projectControl.createProjectObj;
  }

  function changePriority() {
    //ToDoObj.setPriority and update through DOMcontroller
  }

  function changeTab() {}

  function readInput() {
    return {};
  }

  return { changeTab, newProject, newToDo, initialise };
})();

// Event listener on sidebar with e.target to know which project is clicked

// Hitting enter creates the todo and the edge of it should have check and cross to confirm/cancel adding

// Filter todo by priority

// Check that project doesn't already exist

masterControl.initialise();
DOMcontroller.addInput();
const form = document.querySelector('form');
form.addEventListener('submit', masterControl.newToDo);

const navButtons = document.querySelector('#nav-buttons');
navButtons.addEventListener('click', masterControl.changeTab);
const addProjectButton = document.querySelector('#add-project-button');
addProjectButton.addEventListener('click', masterControl.newProject);
