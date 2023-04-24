import './style.css';
import { isToday, isThisWeek } from 'date-fns';

const storage = (() => {
  function saveProject(projectObj) {
    localStorage.setItem(projectObj.getName(), JSON.stringify(projectObj));
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

  function getDueThisWeek() {
    const arr = storage.getAllProjectNames();
    const projects = arr.map((name) => storage.getProject(name));
    return projects.reduce((acc, project) => {
      project.arr.forEach((element) => {
        if (isThisWeek(new Date(element.dueDate))) {
          acc.push(element);
        }
      });
      return acc;
    }, []);
  }

  function getDueToday() {
    const arr = storage.getAllProjectNames();
    const projects = arr.map((name) => storage.getProject(name));
    return projects.reduce((acc, project) => {
      project.arr.forEach((element) => {
        if (isToday(new Date(element.dueDate))) {
          acc.push(element);
        }
      });
      return acc;
    }, []);
  }
  return { createProjectObj, loadProjectObj, getDueThisWeek, getDueToday };
})();

const DOMcontroller = (() => {
  const content = document.querySelector('.content');

  function addInput() {
    const div = document.createElement('div');
    div.setAttribute('id', 'input-container');
    div.innerHTML = `<form action="#" id='todo-form'>
          <textarea name="title" placeholder="Title: Buy Groceries" required/></textarea>
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

  function toggleProjectInput() {
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
        li.classList.add('project-name', 'clickable');
        container.appendChild(li);
      }
    }
  }

  function addToDo(toDoObj) {
    const main = document.querySelector('#main');
    const toDoContainer = document.createElement('div');
    toDoContainer.setAttribute('data-priority', toDoObj.priority);
    toDoContainer.setAttribute('data-title', toDoObj.title);
    toDoContainer.classList.add('project');
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.classList.add('checkbox');
    checkbox.classList.add('clickable');
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

  function loadTab(toDoArr) {
    clearTab();
    for (const toDoObj of toDoArr) {
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
    toggleProjectInput,
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
    loadProjectTab();
    DOMcontroller.addInput();
    const addProjectButton = document.querySelector('#add-project-button');
    addProjectButton.addEventListener(
      'click',
      DOMcontroller.toggleProjectInput
    );
    const projectForm = document.querySelector('#project-form');
    projectForm.addEventListener('submit', masterControl.newProject);
    const toDoForm = document.querySelector('#todo-form');
    toDoForm.addEventListener('submit', masterControl.newToDo);
    const projectContainer = document.querySelector('#project-container');
    projectContainer.addEventListener('click', changeProject);
    document
      .querySelector('#default-nav')
      .addEventListener('click', changeProject);
  }

  function newToDo(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const toDoObj = Object.fromEntries(formData);
    currentProjectObj.addToDoObj(toDoObj);
    e.target.reset();
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
    DOMcontroller.toggleProjectInput();
    const projectInput = document.querySelector('#project-name');
    const project = projectInput.value;
    projectInput.value = '';
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

  function loadProjectTab() {
    currentProjectObj = storage.getProject(currentProject);
    DOMcontroller.loadTab(currentProjectObj.arr);
  }

  function loadDueBy(btn) {
    let arr;
    if (btn === 'Today') {
      arr = projectControl.getDueToday();
    } else if (btn === 'Week') {
      arr = projectControl.getDueThisWeek();
    }
    DOMcontroller.loadTab(arr);
  }

  function readInput() {
    return {};
  }

  function changeProject(e) {
    const btn = e.target.textContent;
    if (btn === 'Today' || btn === 'Week') {
      loadDueBy(btn);
    } else {
      currentProject = btn;
      loadProjectTab();
    }
  }

  return { loadProjectTab, newProject, newToDo, removeToDo, initialise };
})();

// Hitting enter creates the todo and the edge of it should have check and cross to confirm/cancel adding

// Implement priority into DOM

masterControl.initialise();
