// import './style.css';
// import { isToday, isThisWeek } from 'date-fns';

const storage = (() => {
  function saveProject(projectObj) {
    localStorage.setItem(projectObj.getName(), JSON.stringify(projectObj));
    console.log(localStorage);
  }

  function getProject(name) {
    return projectControl.loadProjectObj(
      JSON.parse(localStorage.getItem(name))
    );
  }

  function getAllProjectNames() {
    return Object.keys(localStorage);
  }

  function isEmpty(name) {
    return localStorage.getItem(name) === null;
  }

  return { saveProject, getProject, getAllProjectNames, isEmpty };
})();

const projectControl = (() => {
  const projectObjProto = {
    addToDoObj(toDoObj) {
      this.arr.push(toDoObj);
    },
    removeToDoObj(title) {
      this.arr = this.arr.filter((toDoObj) => toDoObj.title !== title);
    },
    getName() {
      return this.name;
    },
  };

  const createProjectObj = (name) => {
    let projectObj = Object.create(projectObjProto);
    projectObj.name = name;
    projectObj.arr = [];
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
    div.innerHTML = `<form action="#" id='todo-form'>
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
    const projectInput = document.querySelector('#project-form');
    projectInput.classList.toggle('hidden');
  }

  function loadProjects(projectNameArr) {
    const container = document.querySelector('#project-container');
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    for (const projectName of projectNameArr) {
      if (projectName !== 'Home') {
        const li = document.createElement('li');
        li.textContent = projectName;
        li.classList.add('project');
        container.appendChild(li);
      }
    }
  }

  function addToDo(toDoObj) {
    const main = document.querySelector('#main');
    const toDoContainer = document.createElement('div');
    toDoContainer.setAttribute('data-priority', toDoObj.priority);
    toDoContainer.setAttribute('data-title', toDoObj.title);
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.classList.add('checkbox');
    checkbox.addEventListener('click', masterControl.removeToDo);
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
    main.appendChild(toDoContainer);
  }

  function removeToDo(toDoElement) {
    toDoElement.remove();
  }

  function updateToDo() {}

  function loadTab(projectObj) {
    clearTab();
    for (const toDoObj of projectObj.arr) {
      addToDo(toDoObj);
    }
  }

  function clearTab() {
    const main = document.querySelector('#main');
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }
  }

  return {
    addInput,
    addProjectInput,
    loadProjects,
    addToDo,
    removeToDo,
    loadTab,
  };
})();

const masterControl = (() => {
  let currentProject = 'Home';
  let currentProjectObj;
  function initialise() {
    if (storage.isEmpty('Home')) {
      let home = projectControl.createProjectObj('Home');
      storage.saveProject(home);
    }
    loadProjects();
    loadTab();
    DOMcontroller.addInput();
    const addProjectButton = document.querySelector('#add-project-button');
    addProjectButton.addEventListener('click', DOMcontroller.addProjectInput);
    const projectForm = document.querySelector('#project-form');
    projectForm.addEventListener('submit', masterControl.newProject);
    const toDoForm = document.querySelector('#todo-form');
    toDoForm.addEventListener('submit', masterControl.newToDo);
    const projectContainer = document.querySelector('#project-container');
    projectContainer.addEventListener('click', changeProject);
  }

  function newToDo(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const toDoObj = Object.fromEntries(formData);
    currentProjectObj.addToDoObj(toDoObj);
    storage.saveProject(currentProjectObj);
    DOMcontroller.addToDo(toDoObj);
  }

  function removeToDo(e) {
    const toDoElement = e.target.parentElement;
    currentProjectObj.removeToDoObj(toDoElement.getAttribute('data-title'));
    storage.saveProject(currentProjectObj);
    DOMcontroller.removeToDo(toDoElement);
  }

  function newProject(e) {
    e.preventDefault();
    const project = document.querySelector('#project-name').value;
    let newProject = projectControl.createProjectObj(project);
    storage.saveProject(newProject);
    loadProjects();
  }
  function loadProjects() {
    DOMcontroller.loadProjects(storage.getAllProjectNames());
  }

  function changePriority() {
    //ToDoObj.setPriority and update through DOMcontroller
  }

  function loadTab() {
    currentProjectObj = storage.getProject(currentProject);
    console.log(currentProjectObj);
    DOMcontroller.loadTab(currentProjectObj);
  }

  function readInput() {
    return {};
  }

  function changeProject(e) {
    console.log(e.target);
    currentProject = e.target.textContent;
    console.log(currentProject);
    loadTab();
  }

  return { loadTab, newProject, newToDo, removeToDo, initialise };
})();

// Event listener on sidebar with e.target to know which project is clicked

// Hitting enter creates the todo and the edge of it should have check and cross to confirm/cancel adding

// Filter todo by priority

// Check that project doesn't already exist

masterControl.initialise();
