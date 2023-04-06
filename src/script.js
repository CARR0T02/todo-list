// import './style.css';
// import { isToday, isThisWeek } from 'date-fns';

const storage = (() => {
  function saveProject(projectObj) {
    localStorage.setItem(projectObj.name, projectObj);
  }

  function getProject(name) {
    return localStorage.getItem(name);
  }

  return { saveProject, getProject };
})();

const projectControl = (() => {
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
  return {};
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

  function addProject(projectObj) {
    const li = document.createElement('li');
    const container = document.querySelector('#project-container');
    li.textContent = projectObj.name;
    li.classList.add('project');
    container.appendChild(li);
  }

  function removeProject() {}

  function addToDo(toDoObj) {
    const container = document
      .createElement('div')
      .setAttribute('data-priority', toDoObj.priority);
    const checkbox = document.createElement('input').classList.add('checkbox');
    const title = document.createElement('div').classList.add('todo-title');
    title.textContent = toDoObj.title;
    const desc = document.createElement('div').classList.add('todo-desc');
    desc.textContent = toDoObj.desc;
    container.appendChild(checkbox);
    container.appendChild(title);
    container.appendChild(desc);
  }

  function removeToDo() {}

  function updateToDo() {}

  function getTab() {}

  return { addInput, addToDo };
})();

const masterControl = (() => {
  let currentProject = 'Home';
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

  function changeTab() {}

  function readInput() {
    return {};
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const toDoObj = Object.fromEntries(formData);
    console.log(toDoObj);
  }

  return { handleSubmit, changeTab };
})();

// ToDo can have data-key according to index in project arr to identify itself

// Event listener on sidebar with e.target to know which project is clicked

// Need default project when opening site

// Hitting enter creates the todo and the edge of it should have check and cross to confirm/cancel adding

// Empty input at the end of list to be able to add a todo

// Filter todo by priority

// Check that project doesn't already exist

DOMcontroller.addInput();
const form = document.querySelector('form');
form.addEventListener('submit', masterControl.handleSubmit);

const projectContainer = document.querySelector('#project-container');
projectContainer.addEventListener('click', masterControl.changeTab);
